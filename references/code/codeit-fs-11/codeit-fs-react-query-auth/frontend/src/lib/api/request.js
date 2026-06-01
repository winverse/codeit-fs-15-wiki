import {
  DEFAULT_ERROR_MESSAGE,
  normalizeErrorMessage,
} from "./error-messages.js";

const BACKEND_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_BASE_URL ??
  "http://localhost:5001";
const API_PREFIX = "/api";

/**
 * URL 끝에 있는 슬래시(/)를 제거하여 경로 결합 시 중복 슬래시(//)를 방지합니다.
 * 예: "http://api.server.com/" -> "http://api.server.com"
 */
function normalizeBaseUrl(url) {
  return url.replace(/\/+$/, "");
}

function buildBackendApiUrl(path) {
  return `${normalizeBaseUrl(BACKEND_BASE_URL)}${API_PREFIX}${path}`;
}

export async function request(path, options = {}) {
  const {
    method = "GET",
    body,
    cache = "no-store",
  } = options;

  const response = await fetch(buildBackendApiUrl(path), {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    cache,
    body: body ? JSON.stringify(body) : undefined,
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const rawMessage =
      payload?.message ?? DEFAULT_ERROR_MESSAGE;
    const message = normalizeErrorMessage(rawMessage);
    const error = new Error(message);
    error.status = response.status;
    error.code = payload?.code;
    error.field = payload?.field;
    throw error;
  }

  return payload;
}
