import { watchFile } from "node:fs";
import { resolve } from "node:path";
import { App } from "@tinyhttp/app";
import { cors } from "@tinyhttp/cors";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { parseWhere } from "json-server/lib/parse-where.js";
import {
  isItem,
  Service,
} from "json-server/lib/service.js";

const PORT = Number.parseInt(
  process.env.PORT ?? "4000",
  10,
);
const HOST = process.env.HOST ?? "0.0.0.0";
const DB_FILE = resolve(process.cwd(), "db.json");

const RESERVED_QUERY_KEYS = new Set([
  "sort",
  "order",
  "page",
  "limit",
  "_embed",
  "_where",
]);

const LEGACY_LIST_QUERY_KEYS = [
  "_sort",
  "_page",
  "_per_page",
];

function findLegacyListQueryKey(params) {
  return LEGACY_LIST_QUERY_KEYS.find((key) =>
    params.has(key),
  );
}

function parseSort(params) {
  const sort = params.get("sort");

  if (sort === null) {
    return "-id";
  }

  const fields = sort
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  if (fields.length === 0) {
    return undefined;
  }

  const order = params.get("order");

  if (order === null) {
    return fields.join(",");
  }

  const normalizedOrder = order.toLowerCase();

  if (!["asc", "desc"].includes(normalizedOrder)) {
    return fields.join(",");
  }

  return fields
    .map((field) => {
      const normalizedField = field.startsWith("-")
        ? field.slice(1)
        : field;

      return normalizedOrder === "desc"
        ? `-${normalizedField}`
        : normalizedField;
    })
    .join(",");
}

function getSearchParams(req) {
  const url = new URL(
    req.url ?? "/",
    `http://${req.headers.host ?? "localhost"}`,
  );
  return url.searchParams;
}

function getQueryValue(req, key) {
  const values = getSearchParams(req).getAll(key);

  if (values.length === 0) {
    return undefined;
  }

  return values.length === 1 ? values[0] : values;
}

function parseListParams(req) {
  const params = getSearchParams(req);
  const filterParams = new URLSearchParams();

  for (const [key, value] of params.entries()) {
    if (!RESERVED_QUERY_KEYS.has(key)) {
      filterParams.append(key, value);
    }
  }

  let where = parseWhere(filterParams.toString());
  const rawWhere = params.get("_where");

  if (typeof rawWhere === "string") {
    try {
      const parsed = JSON.parse(rawWhere);

      if (typeof parsed === "object" && parsed !== null) {
        where = parsed;
      }
    } catch {
      // Ignore invalid JSON and fallback to parsed query params.
    }
  }

  const pageRaw = params.get("page");
  const perPageRaw = params.get("limit");
  const page =
    pageRaw === null
      ? undefined
      : Number.parseInt(pageRaw, 10);
  const perPage =
    perPageRaw === null
      ? undefined
      : Number.parseInt(perPageRaw, 10);

  return {
    where,
    sort: parseSort(params),
    page: Number.isNaN(page) ? undefined : page,
    perPage: Number.isNaN(perPage) ? undefined : perPage,
    embed: getQueryValue(req, "_embed"),
  };
}

async function parseJsonBody(req, res, next) {
  const method = (req.method ?? "").toUpperCase();

  if (!["POST", "PUT", "PATCH"].includes(method)) {
    next?.();
    return;
  }

  const contentType = req.headers["content-type"];

  if (
    typeof contentType === "string" &&
    !contentType.includes("application/json")
  ) {
    next?.();
    return;
  }

  const chunks = [];

  for await (const chunk of req) {
    chunks.push(
      typeof chunk === "string"
        ? Buffer.from(chunk)
        : chunk,
    );
  }

  if (chunks.length === 0) {
    req.body = {};
    next?.();
    return;
  }

  try {
    req.body = JSON.parse(
      Buffer.concat(chunks).toString("utf8"),
    );
    next?.();
  } catch {
    res
      .status(400)
      .json({ error: "Body must be valid JSON" });
  }
}

function validateItemBody(req, res) {
  if (!isItem(req.body)) {
    res
      .status(400)
      .json({ error: "Body must be a JSON object" });
    return false;
  }

  return true;
}

function sendJson(res, data, status) {
  if (data === undefined) {
    res.sendStatus(404);
    return;
  }

  if (status !== undefined) {
    res.status(status);
  }

  res.json(data);
}

const adapter = new JSONFile(DB_FILE);
const db = new Low(adapter, {});

await db.read();
db.data ||= {};

watchFile(
  DB_FILE,
  { interval: 300 },
  async (current, previous) => {
    if (
      current.mtimeMs === 0 ||
      current.mtimeMs === previous.mtimeMs
    ) {
      return;
    }

    try {
      await db.read();
    } catch (error) {
      console.error(
        "[backend] db.json reload failed:",
        error,
      );
    }
  },
);

const service = new Service(db);
const app = new App();

app.use((req, res, next) => {
  const requestedHeaders =
    req.headers["access-control-request-headers"];
  const allowedHeaders =
    typeof requestedHeaders === "string"
      ? requestedHeaders
          .split(",")
          .map((value) => value.trim())
      : undefined;

  return cors({ allowedHeaders })(req, res, next);
});

app.use(parseJsonBody);

app.get("/", (_req, res) => {
  res.json(db.data);
});

app.get("/:name", (req, res) => {
  const { name = "" } = req.params;
  const legacyKey = findLegacyListQueryKey(
    getSearchParams(req),
  );

  if (legacyKey !== undefined) {
    res.status(400).json({
      error: `Legacy query key "${legacyKey}" is no longer supported. Use sort, order, page, limit.`,
    });
    return;
  }

  sendJson(res, service.find(name, parseListParams(req)));
});

app.get("/:name/:id", (req, res) => {
  const { name = "", id = "" } = req.params;
  const embed = getQueryValue(req, "_embed");

  sendJson(
    res,
    service.findById(name, id, { _embed: embed }),
  );
});

app.post("/:name", async (req, res) => {
  const { name = "" } = req.params;

  if (!validateItemBody(req, res)) {
    return;
  }

  sendJson(res, await service.create(name, req.body), 201);
});

app.put("/:name", async (req, res) => {
  const { name = "" } = req.params;

  if (!validateItemBody(req, res)) {
    return;
  }

  sendJson(res, await service.update(name, req.body));
});

app.put("/:name/:id", async (req, res) => {
  const { name = "", id = "" } = req.params;

  if (!validateItemBody(req, res)) {
    return;
  }

  sendJson(
    res,
    await service.updateById(name, id, req.body),
  );
});

app.patch("/:name", async (req, res) => {
  const { name = "" } = req.params;

  if (!validateItemBody(req, res)) {
    return;
  }

  sendJson(res, await service.patch(name, req.body));
});

app.patch("/:name/:id", async (req, res) => {
  const { name = "", id = "" } = req.params;

  if (!validateItemBody(req, res)) {
    return;
  }

  sendJson(
    res,
    await service.patchById(name, id, req.body),
  );
});

app.delete("/:name/:id", async (req, res) => {
  const { name = "", id = "" } = req.params;
  const dependent = getQueryValue(req, "_dependent");
  const deletedItem = await service.destroyById(
    name,
    id,
    dependent,
  );

  if (deletedItem === undefined) {
    res.sendStatus(404);
    return;
  }

  res.status(204);
  res.end();
});

app.listen(PORT, HOST, () => {
  console.log(
    `[backend] listening on http://${HOST}:${PORT}`,
  );
});
