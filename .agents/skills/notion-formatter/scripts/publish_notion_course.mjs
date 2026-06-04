#!/usr/bin/env node
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execSync } from "node:child_process";

const DEFAULT_NOTION_VERSION = "2026-03-11";
const DEFAULT_QUIZ_TOGGLE_LABEL = "정답 및 해설";
const DOWNLOAD_FILE_EXTENSIONS = new Set([
  ".zip",
  ".pdf",
  ".pptx",
  ".xlsx",
  ".docx",
  ".csv",
  ".txt",
]);
const SPECIAL_INLINE_TAG_COLORS = new Map([
  ["#스크립트", "gray_background"],
  ["#퀴즈", "yellow_background"],
  ["#실습", "blue_background"],
]);
const OTHER_HASHTAG_COLOR = "pink_background";
const INLINE_CODE_COLOR = "blue";

function printHelp() {
  console.log(`Usage:
  node publish_notion_course.mjs --input <course.md> --page-id <notion-page-id> [options]

Options:
  --input <path>                 Source Markdown file. A positional path also works.
  --page-id <id>                 Notion page ID or Notion page URL.
  --replace                      Archive existing top-level page blocks before upload.
  --heading3-toggles             Convert "### NN. ..." headings into toggleable heading_3 blocks. Default: on.
  --no-heading3-toggles          Keep "### NN. ..." headings as normal heading_3 blocks.
  --quiz-toggle-label <text>     Label for quiz answer toggles. Default: 정답 및 해설.
  --image-mode <mode>            github-raw | file-upload | external | placeholder. Default: github-raw.
  --github-raw-base <url>        Override raw base URL. Default: inferred from origin/main.
  --no-file-upload               Render local downloadable files as text placeholders.
  --archive-concurrency <n>      Existing block archive concurrency. Default: 3.
  --dry-run                      Print the upload plan without changing Notion.
  --help                         Show this help.
`);
}

function parseArgs(argv) {
  const options = {
    input: "",
    pageId: "",
    replace: false,
    heading3Toggles: true,
    quizToggleLabel: DEFAULT_QUIZ_TOGGLE_LABEL,
    imageMode: "github-raw",
    githubRawBase: "",
    fileUpload: true,
    archiveConcurrency: 3,
    dryRun: false,
  };
  const positional = [];

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") options.help = true;
    else if (arg === "--input" || arg === "-i") options.input = argv[++index] ?? "";
    else if (arg === "--page-id") options.pageId = argv[++index] ?? "";
    else if (arg === "--replace") options.replace = true;
    else if (arg === "--heading3-toggles") options.heading3Toggles = true;
    else if (arg === "--no-heading3-toggles") options.heading3Toggles = false;
    else if (arg === "--quiz-toggle-label") options.quizToggleLabel = argv[++index] ?? "";
    else if (arg === "--image-mode") options.imageMode = argv[++index] ?? "";
    else if (arg === "--github-raw-base") options.githubRawBase = argv[++index] ?? "";
    else if (arg === "--no-file-upload") options.fileUpload = false;
    else if (arg === "--archive-concurrency") options.archiveConcurrency = Number(argv[++index] ?? 0);
    else if (arg === "--dry-run") options.dryRun = true;
    else if (arg.startsWith("-")) throw new Error(`Unknown option: ${arg}`);
    else positional.push(arg);
  }

  if (!options.input && positional.length > 0) options.input = positional[0];
  if (!["github-raw", "file-upload", "external", "placeholder"].includes(options.imageMode)) {
    throw new Error("--image-mode must be one of: github-raw, file-upload, external, placeholder");
  }
  if (!Number.isInteger(options.archiveConcurrency) || options.archiveConcurrency < 1) {
    throw new Error("--archive-concurrency must be a positive integer");
  }
  return options;
}

function normalizePageId(value) {
  const match = String(value).match(/[0-9a-fA-F]{32}|[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/);
  if (!match) return "";
  const compact = match[0].replaceAll("-", "").toLowerCase();
  return `${compact.slice(0, 8)}-${compact.slice(8, 12)}-${compact.slice(12, 16)}-${compact.slice(16, 20)}-${compact.slice(20)}`;
}

function loadNotionToken() {
  if (process.env.NOTION_TOKEN) return process.env.NOTION_TOKEN;

  const configPath = path.join(os.homedir(), ".codex/config.toml");
  if (!fs.existsSync(configPath)) return "";

  const config = fs.readFileSync(configPath, "utf8");
  return config.match(/NOTION_TOKEN\s*=\s*"([^"]+)"/)?.[1] ?? "";
}

function shell(command, cwd) {
  return execSync(command, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
}

function gitRoot(startDir) {
  try {
    return shell("git rev-parse --show-toplevel", startDir);
  } catch {
    return "";
  }
}

function inferGithubRawBase(repoRoot) {
  const remote = shell("git remote get-url origin", repoRoot);
  const branch = shell("git branch --show-current", repoRoot) || "main";
  const httpsMatch = remote.match(/^https:\/\/github\.com\/(.+?)\/(.+?)(?:\.git)?$/);
  const sshMatch = remote.match(/^git@github\.com:(.+?)\/(.+?)(?:\.git)?$/);
  const match = httpsMatch || sshMatch;
  if (!match) {
    throw new Error("Could not infer GitHub raw URL from origin remote. Use --github-raw-base.");
  }
  return `https://raw.githubusercontent.com/${match[1]}/${match[2]}/${branch}/`;
}

function encodeGitPath(gitPath) {
  return gitPath.split("/").map(encodeURIComponent).join("/");
}

function safeDecodeUriComponent(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function extensionOfHref(href) {
  const withoutHash = String(href).split("#")[0];
  const withoutQuery = withoutHash.split("?")[0];
  return path.extname(safeDecodeUriComponent(withoutQuery)).toLowerCase();
}

function isDownloadFileHref(href) {
  return DOWNLOAD_FILE_EXTENSIONS.has(extensionOfHref(href));
}

function mimeTypeForFile(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  const map = new Map([
    [".zip", "application/zip"],
    [".pdf", "application/pdf"],
    [".pptx", "application/vnd.openxmlformats-officedocument.presentationml.presentation"],
    [".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
    [".docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
    [".csv", "text/csv"],
    [".txt", "text/plain"],
    [".png", "image/png"],
    [".jpg", "image/jpeg"],
    [".jpeg", "image/jpeg"],
    [".gif", "image/gif"],
    [".webp", "image/webp"],
    [".svg", "image/svg+xml"],
  ]);
  return map.get(extension) || "application/octet-stream";
}

function buildGitFileMap(repoRoot) {
  const files = new Map();
  const output = execSync("git -c core.quotePath=false ls-files -z", { cwd: repoRoot, encoding: "utf8" });
  for (const gitPath of output.split("\0").filter(Boolean)) {
    const absolute = path.resolve(repoRoot, gitPath);
    files.set(absolute, gitPath);
    files.set(absolute.normalize("NFC"), gitPath);
    files.set(absolute.normalize("NFD"), gitPath);
  }
  return files;
}

function isCodeFence(line) {
  return line.trim().startsWith("```");
}

function cleanInline(value) {
  return String(value ?? "")
    .replaceAll("#Quiz", "#퀴즈")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1 ($2)")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/^>\s?/, "")
    .trimEnd();
}

function cleanMarkdownInline(value) {
  return String(value ?? "")
    .replaceAll("#Quiz", "#퀴즈")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1 ($2)")
    .replace(/^>\s?/, "")
    .trimEnd();
}

function textChunk(content, color = "default", annotations = {}) {
  const chunk = { type: "text", text: { content } };
  if (color !== "default" || Object.keys(annotations).length > 0) {
    chunk.annotations = {
      bold: Boolean(annotations.bold),
      italic: Boolean(annotations.italic),
      strikethrough: Boolean(annotations.strikethrough),
      underline: Boolean(annotations.underline),
      code: Boolean(annotations.code),
      color,
    };
  }
  return chunk;
}

function pushTextChunks(chunks, content, color = "default", annotations = {}) {
  for (let index = 0; index < content.length; index += 1900) {
    chunks.push(textChunk(content.slice(index, index + 1900), color, annotations));
  }
}

function nextInlineTag(value, startIndex) {
  const regex = /#[\p{L}\p{N}_-]+/gu;
  regex.lastIndex = startIndex;
  const match = regex.exec(value);
  if (!match) return null;
  const tag = match[0];
  return {
    tag,
    index: match.index,
    color: SPECIAL_INLINE_TAG_COLORS.get(tag) || OTHER_HASHTAG_COLOR,
  };
}

function richText(content, options = {}) {
  const value = String(content ?? "");
  const chunks = [];
  if (!options.highlightCourseTags) {
    pushTextChunks(chunks, value);
    return chunks.length > 0 ? chunks : [{ type: "text", text: { content: "" } }];
  }

  let cursor = 0;
  while (cursor < value.length) {
    const match = nextInlineTag(value, cursor);
    if (!match) {
      pushTextChunks(chunks, value.slice(cursor));
      break;
    }
    if (match.index > cursor) pushTextChunks(chunks, value.slice(cursor, match.index));
    pushTextChunks(chunks, match.tag, match.color);
    cursor = match.index + match.tag.length;
  }

  return chunks.length > 0 ? chunks : [{ type: "text", text: { content: "" } }];
}

function markdownRichText(content) {
  const value = String(content ?? "");
  const chunks = [];
  const regex = /(\*\*([^*]+)\*\*|`([^`]+)`)/g;
  let cursor = 0;
  let match;

  while ((match = regex.exec(value))) {
    if (match.index > cursor) pushTextChunks(chunks, value.slice(cursor, match.index));
    if (match[2] != null) {
      const boldCode = match[2].match(/^`([^`]+)`$/);
      if (boldCode) pushTextChunks(chunks, boldCode[1], INLINE_CODE_COLOR, { bold: true, code: true });
      else pushTextChunks(chunks, match[2], "default", { bold: true });
    }
    else if (match[3] != null) pushTextChunks(chunks, match[3], INLINE_CODE_COLOR, { bold: true, code: true });
    cursor = match.index + match[0].length;
  }

  if (cursor < value.length) pushTextChunks(chunks, value.slice(cursor));
  return chunks.length > 0 ? chunks : [{ type: "text", text: { content: "" } }];
}

function splitRichTextForCourseTags(chunks) {
  const result = [];

  for (const chunk of chunks) {
    const content = chunk.text?.content ?? "";
    if (!content || chunk.annotations?.code) {
      result.push(chunk);
      continue;
    }

    const annotations = chunk.annotations || {};
    const originalColor = annotations.color || "default";
    const annotationFlags = {
      bold: annotations.bold,
      italic: annotations.italic,
      strikethrough: annotations.strikethrough,
      underline: annotations.underline,
      code: annotations.code,
    };

    let cursor = 0;
    while (cursor < content.length) {
      const match = nextInlineTag(content, cursor);
      if (!match) {
        pushTextChunks(result, content.slice(cursor), originalColor, annotationFlags);
        break;
      }
      if (match.index > cursor) {
        pushTextChunks(result, content.slice(cursor, match.index), originalColor, annotationFlags);
      }
      pushTextChunks(result, match.tag, match.color, annotationFlags);
      cursor = match.index + match.tag.length;
    }
  }

  return result.length > 0 ? result : [{ type: "text", text: { content: "" } }];
}

function headingRichText(content, level) {
  const chunks = markdownRichText(cleanMarkdownInline(content).trim());
  return level === 3 ? splitRichTextForCourseTags(chunks) : chunks;
}

function paragraph(content) {
  return paragraphFromRichText(markdownRichText(cleanMarkdownInline(content)));
}

function paragraphFromRichText(chunks, color = "default") {
  return {
    object: "block",
    type: "paragraph",
    paragraph: {
      rich_text: chunks.length > 0 ? chunks : [{ type: "text", text: { content: "" } }],
      color,
    },
  };
}

function scriptParagraph(content) {
  return paragraphFromRichText(markdownRichText(String(content).replace(/\s+$/, "")), "gray_background");
}

function quoteBlock(lines) {
  const content = (Array.isArray(lines) ? lines : [lines])
    .map(cleanMarkdownInline)
    .join("\n")
    .replace(/\s+$/, "");
  return {
    object: "block",
    type: "quote",
    quote: {
      rich_text: markdownRichText(content),
      color: "default",
    },
  };
}

function listItem(type, content) {
  return {
    object: "block",
    type,
    [type]: {
      rich_text: markdownRichText(cleanMarkdownInline(content).trim()),
      color: "default",
    },
  };
}

function bulletedListItem(content) {
  return listItem("bulleted_list_item", content);
}

function numberedListItem(content) {
  return listItem("numbered_list_item", content);
}

function toggleBlock(content, children = []) {
  return {
    object: "block",
    type: "toggle",
    toggle: {
      rich_text: markdownRichText(cleanMarkdownInline(content).trim()),
      color: "default",
      children,
    },
  };
}

function blockChildren(block) {
  const payload = block?.[block.type];
  if (!payload) return [];
  if (!payload.children) payload.children = [];
  return payload.children;
}

function markdownIndentColumns(indent) {
  let columns = 0;
  for (const char of String(indent ?? "")) columns += char === "\t" ? 4 : 1;
  return columns;
}

function leadingIndentColumns(line) {
  return markdownIndentColumns(String(line ?? "").match(/^\s*/)?.[0] || "");
}

function stripIndentColumns(line, columns) {
  let removed = 0;
  let index = 0;
  const value = String(line ?? "");
  while (index < value.length && removed < columns) {
    const char = value[index];
    if (char === " ") {
      removed += 1;
      index += 1;
    } else if (char === "\t") {
      removed += 4;
      index += 1;
    } else {
      break;
    }
  }
  return value.slice(index);
}

function flattenUnits(units) {
  const blocks = [];
  for (const unit of units) {
    if (unit.kind === "section") blocks.push(unit.block, ...unit.children);
    else blocks.push(unit.block);
  }
  return blocks;
}

function firstIndentedChildLine(lines, startIndex, parentIndent) {
  for (let index = startIndex + 1; index < lines.length; index += 1) {
    const line = lines[index];
    if (!line.trim()) continue;
    const indent = leadingIndentColumns(line);
    return indent > parentIndent ? { line, indent, index } : null;
  }
  return null;
}

function isToggleListItem(lines, index, parentIndent) {
  const firstChild = firstIndentedChildLine(lines, index, parentIndent);
  if (!firstChild) return false;
  return !/^[-*]\s+/.test(firstChild.line.trim()) && !/^\d+[.)]\s+/.test(firstChild.line.trim());
}

function collectIndentedChildren(lines, startIndex, parentIndent) {
  const childLines = [];
  let index = startIndex + 1;
  let sawChild = false;

  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim()) {
      childLines.push(line);
      index += 1;
      continue;
    }

    if (leadingIndentColumns(line) <= parentIndent) break;
    sawChild = true;
    childLines.push(line);
    index += 1;
  }

  while (childLines.length > 0 && !childLines[0].trim()) childLines.shift();
  while (childLines.length > 0 && !childLines[childLines.length - 1].trim()) childLines.pop();

  const minIndent = childLines
    .filter((line) => line.trim())
    .reduce((min, line) => Math.min(min, leadingIndentColumns(line)), Number.POSITIVE_INFINITY);

  return {
    lines: sawChild && Number.isFinite(minIndent)
      ? childLines.map((line) => stripIndentColumns(line, minIndent))
      : [],
    nextIndex: index,
  };
}

function isQuotedStructuralBlock(line) {
  const structural = String(line ?? "").trim().replace(/^>\s?/, "");
  return (
    /^!\[([^\]]*)\]\(([^)]+)\)$/.test(structural) ||
    /^\[([^\]]+)\]\(([^)]+)\)$/.test(structural) ||
    /^```([A-Za-z0-9_-]*)/.test(structural)
  );
}

function dividerBlock() {
  return {
    object: "block",
    type: "divider",
    divider: {},
  };
}

function isScriptSection(currentSection) {
  return Boolean(currentSection.value?.title && /#스크립트/.test(currentSection.value.title));
}

function isQuizSection(currentSection) {
  return Boolean(currentSection.value?.title && /#퀴즈/.test(currentSection.value.title.replaceAll("#Quiz", "#퀴즈")));
}

function quizQuestionBlocks(line, currentSection) {
  const match = line.trim().match(/^\*\*문제\s+(\d+)\.\s*(?:\[([^\]]+)\])?\*\*\s*(.*)$/);
  if (!match) return null;

  const [, number, type, question] = match;
  const blocks = [];
  if (currentSection.value?.children.length > 0) blocks.push(dividerBlock());

  const titleChunks = [];
  pushTextChunks(titleChunks, `문제 ${number}`, "default", { bold: true });
  if (type) pushTextChunks(titleChunks, ` · ${type}`, "gray");
  blocks.push(paragraphFromRichText(titleChunks));

  if (question.trim()) blocks.push(paragraph(question.trim()));
  return blocks;
}

function heading(level, content, isToggleable = false) {
  const type = level <= 1
    ? "heading_1"
    : level === 2
      ? "heading_2"
      : level === 3
        ? "heading_3"
        : "heading_4";
  return {
    object: "block",
    type,
    [type]: {
      rich_text: headingRichText(content, level),
      color: "default",
      is_toggleable: isToggleable,
    },
  };
}

function looksLikeHtmlCode(content) {
  const value = String(content ?? "").trim();
  if (!value) return false;
  return /^<!doctype\s+html\b/i.test(value) || /<\/?[A-Za-z][\w:-]*(?:\s+[^<>]*)?>/.test(value);
}

function normalizeCodeLanguage(language, content) {
  let normalized = String(language || "").trim().toLowerCase();
  if (!normalized || normalized === "text" || normalized === "plain text") {
    return looksLikeHtmlCode(content) ? "html" : "plain text";
  }
  if (normalized === "jsx") normalized = "plain text";
  if (!["plain text", "javascript", "typescript", "html", "css", "json", "markdown"].includes(normalized)) {
    normalized = "plain text";
  }
  return normalized;
}

function codeBlock(content, language) {
  const normalized = normalizeCodeLanguage(language, content);
  return {
    object: "block",
    type: "code",
    code: {
      rich_text: richText(String(content).replace(/\s+$/, "")),
      language: normalized,
    },
  };
}

function imageBlock(alt, href, context) {
  if (/^https?:\/\//i.test(href)) {
    return {
      object: "block",
      type: "image",
      image: { type: "external", external: { url: href }, caption: [] },
    };
  }

  if (context.imageMode === "placeholder") return paragraph(`이미지: ${href}`);
  if (context.imageMode === "file-upload") {
    if (!context.fileUpload) return paragraph(`이미지: ${href}`);
    const absolute = path.resolve(context.markdownDir, decodeURIComponent(href));
    if (!fs.existsSync(absolute)) {
      throw new Error(`Local image link cannot be found: ${href}`);
    }
    context.imageUploadPaths.push(absolute);
    return {
      object: "block",
      type: "image",
      image: {
        caption: [],
        type: "file_upload",
        file_upload: { id: "__PENDING_IMAGE_UPLOAD__" },
      },
      _localImage: {
        absolute,
        name: path.basename(safeDecodeUriComponent(href)),
      },
    };
  }

  if (context.imageMode !== "github-raw") {
    throw new Error(`Local image requires --image-mode github-raw, file-upload, or placeholder: ${href}`);
  }

  const absolute = path.resolve(context.markdownDir, decodeURIComponent(href));
  const gitPath =
    context.gitFiles.get(absolute) ||
    context.gitFiles.get(absolute.normalize("NFC")) ||
    context.gitFiles.get(absolute.normalize("NFD"));

  if (!gitPath) {
    throw new Error(`Image file is not tracked by git or cannot be mapped: ${href}`);
  }

  const url = `${context.githubRawBase}${encodeGitPath(gitPath)}`;
  context.imageUrls.push(url);
  return {
    object: "block",
    type: "image",
    image: {
      type: "external",
      external: { url },
      caption: [],
    },
  };
}

function fileBlock(label, href, context) {
  const name = cleanInline(label || path.basename(safeDecodeUriComponent(href)));

  if (/^https?:\/\//i.test(href)) {
    return {
      object: "block",
      type: "file",
      file: {
        caption: [],
        type: "external",
        external: { url: href },
        name,
      },
    };
  }

  if (!context.fileUpload) return paragraph(`파일: ${name}`);

  const absolute = path.resolve(context.markdownDir, safeDecodeUriComponent(href));
  if (!fs.existsSync(absolute)) {
    throw new Error(`Local file link cannot be found: ${href}`);
  }

  context.fileUploadPaths.push(absolute);
  return {
    object: "block",
    type: "file",
    file: {
      caption: [],
      type: "file_upload",
      file_upload: { id: "__PENDING_FILE_UPLOAD__" },
    },
    _localFile: {
      absolute,
      name,
    },
  };
}

function parseAnswerChildren(answerLines) {
  const children = [];
  let buffer = [];

  function flushParagraph() {
    const content = buffer.map((line) => cleanInline(line.trim())).filter(Boolean).join("\n");
    if (content) children.push(paragraph(content));
    buffer = [];
  }

  for (let index = 0; index < answerLines.length; index += 1) {
    let line = answerLines[index].replace(/^\s{0,4}/, "");
    if (!line.trim()) {
      flushParagraph();
      continue;
    }

    const fence = line.match(/^```([A-Za-z0-9_-]*)/);
    if (fence) {
      flushParagraph();
      const language = fence[1] || "plain text";
      const code = [];
      index += 1;
      while (index < answerLines.length && !answerLines[index].trim().startsWith("```")) {
        code.push(answerLines[index].replace(/^\s{4}/, ""));
        index += 1;
      }
      children.push(codeBlock(code.join("\n"), language));
      continue;
    }

    buffer.push(line.replace(/^>\s?/, ""));
  }

  flushParagraph();
  return children.length > 0 ? children : [paragraph("정답과 해설을 확인합니다.")];
}

function answerToggle(answerLines, label) {
  return {
    object: "block",
    type: "toggle",
    toggle: {
      rich_text: richText(label),
      color: "default",
      children: parseAnswerChildren(answerLines),
    },
  };
}

function togglePlainText(block) {
  if (block.type !== "toggle") return "";
  return (block.toggle.rich_text || []).map((chunk) => chunk.plain_text ?? chunk.text?.content ?? "").join("");
}

function countQuizToggles(blocks, label, count = { value: 0 }) {
  for (const block of blocks) {
    if (togglePlainText(block) === label) count.value += 1;
    const payload = block[block.type];
    if (payload?.children) countQuizToggles(payload.children, label, count);
  }
  return count.value;
}

function countUnitQuizToggles(units, label) {
  const count = { value: 0 };
  for (const unit of units) {
    if (unit.kind === "section") countQuizToggles([unit.block, ...unit.children], label, count);
    else countQuizToggles([unit.block], label, count);
  }
  return count.value;
}

function addToCurrent(units, currentSection, block) {
  if (currentSection.value) currentSection.value.children.push(block);
  else units.push({ kind: "block", block });
}

function buildUnits(sourceText, context) {
  const lines = sourceText.replace(/\r\n/g, "\n").split("\n");
  const units = [];
  const currentSection = { value: null };
  let paragraphBuffer = [];
  let listStack = [];

  function resetListStack() {
    listStack = [];
  }

  function addBlock(block) {
    resetListStack();
    addToCurrent(units, currentSection, block);
  }

  function flushParagraph() {
    const content = paragraphBuffer.map(cleanInline).filter((line) => line.trim().length > 0).join("\n");
    if (content) addBlock(paragraph(content));
    paragraphBuffer = [];
  }

  function closeSection() {
    flushParagraph();
    resetListStack();
    if (currentSection.value) {
      units.push(currentSection.value);
      currentSection.value = null;
    }
  }

  function addListBlock(block, indent) {
    while (listStack.length > 0 && indent <= listStack[listStack.length - 1].indent) {
      listStack.pop();
    }

    const parent = listStack[listStack.length - 1]?.block;
    if (parent) blockChildren(parent).push(block);
    else addToCurrent(units, currentSection, block);

    listStack.push({ indent, block });
  }

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const trimmed = line.trim();

    if (index === 0 && /^#\s+/.test(line)) continue;
    if (!trimmed) {
      flushParagraph();
      resetListStack();
      continue;
    }
    if (/^---\s*$/.test(trimmed)) {
      flushParagraph();
      resetListStack();
      continue;
    }

    const h2 = line.match(/^##\s+(.+)$/);
    if (h2) {
      closeSection();
      units.push({ kind: "block", block: heading(2, h2[1], false) });
      continue;
    }

    const h3 = line.match(/^###\s+(.+)$/);
    if (h3) {
      flushParagraph();
      const title = h3[1];
      if (context.heading3Toggles && /^\d{2}\./.test(title)) {
        closeSection();
        currentSection.value = {
          kind: "section",
          title,
          block: heading(3, title, true),
          children: [],
        };
      } else {
        addBlock(heading(3, title, false));
      }
      continue;
    }

    const h4 = line.match(/^####\s+(.+)$/);
    if (h4) {
      flushParagraph();
      resetListStack();
      addBlock(heading(4, h4[1], false));
      continue;
    }

    const structural = trimmed.replace(/^>\s?/, "");

    const image = structural.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (image) {
      flushParagraph();
      addBlock(imageBlock(image[1], image[2], context));
      continue;
    }

    const file = structural.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (file && isDownloadFileHref(file[2])) {
      flushParagraph();
      addBlock(fileBlock(file[1], file[2], context));
      continue;
    }

    const fence = structural.match(/^```([A-Za-z0-9_-]*)/);
    if (fence) {
      flushParagraph();
      const language = fence[1] || "plain text";
      const code = [];
      index += 1;
      while (index < lines.length && !lines[index].trim().replace(/^>\s?/, "").startsWith("```")) {
        code.push(lines[index]);
        index += 1;
      }
      addBlock(isScriptSection(currentSection)
        ? scriptParagraph(code.join("\n"))
        : codeBlock(code.join("\n"), language));
      continue;
    }

    if (/^-\s*(정답 확인하기|정답 및 해설)\s*$/.test(trimmed)) {
      flushParagraph();
      const answerLines = [];
      index += 1;
      while (index < lines.length) {
        const nextLine = lines[index];
        const nextTrimmed = nextLine.trim();
        if (
          /^---\s*$/.test(nextTrimmed) ||
          /^##\s+/.test(nextLine) ||
          /^###\s+\d{2}\./.test(nextLine) ||
          /^\*\*문제\s+/.test(nextTrimmed)
        ) {
          index -= 1;
          break;
        }
        answerLines.push(nextLine);
        index += 1;
      }
      addBlock(answerToggle(answerLines, context.quizToggleLabel));
      continue;
    }

    if (/^>\s?/.test(line)) {
      flushParagraph();
      const quoteLines = [];
      while (index < lines.length && /^>\s?/.test(lines[index]) && !isQuotedStructuralBlock(lines[index])) {
        quoteLines.push(lines[index]);
        index += 1;
      }
      index -= 1;
      addBlock(quoteBlock(quoteLines));
      continue;
    }

    const bullet = line.match(/^(\s*)[-*]\s+(.+)$/);
    if (bullet) {
      flushParagraph();
      const indent = markdownIndentColumns(bullet[1]);
      if (indent === 0 && isToggleListItem(lines, index, indent)) {
        resetListStack();
        const collected = collectIndentedChildren(lines, index, indent);
        const children = flattenUnits(buildUnits(collected.lines.join("\n"), context));
        addToCurrent(units, currentSection, toggleBlock(bullet[2], children));
        index = collected.nextIndex - 1;
        continue;
      }
      addListBlock(bulletedListItem(bullet[2]), indent);
      continue;
    }

    const numbered = line.match(/^(\s*)\d+[.)]\s+(.+)$/);
    if (numbered) {
      flushParagraph();
      addListBlock(numberedListItem(numbered[2]), markdownIndentColumns(numbered[1]));
      continue;
    }

    if (isQuizSection(currentSection)) {
      const blocks = quizQuestionBlocks(line, currentSection);
      if (blocks) {
        flushParagraph();
        for (const block of blocks) addBlock(block);
        continue;
      }
    }

    resetListStack();
    paragraphBuffer.push(line);
  }

  closeSection();
  return units;
}

function countBlocks(blocks, counts = {}) {
  for (const block of blocks) {
    counts[block.type] = (counts[block.type] || 0) + 1;
    const payload = block[block.type];
    if (payload?.children) countBlocks(payload.children, counts);
  }
  return counts;
}

function countUnits(units) {
  const counts = {};
  for (const unit of units) {
    if (unit.kind === "section") countBlocks([unit.block, ...unit.children], counts);
    else countBlocks([unit.block], counts);
  }
  return counts;
}

function countInlineTagColors(blocks, counts = {}) {
  for (const block of blocks) {
    if (block.type === "heading_1" || block.type === "heading_2" || block.type === "heading_3") {
      for (const text of block[block.type].rich_text || []) {
        const color = text.annotations?.color || "default";
        if (color !== "default") counts[color] = (counts[color] || 0) + 1;
      }
    }
    const payload = block[block.type];
    if (payload?.children) countInlineTagColors(payload.children, counts);
  }
  return counts;
}

function countUnitInlineTagColors(units) {
  const counts = {};
  for (const unit of units) {
    if (unit.kind === "section") countInlineTagColors([unit.block, ...unit.children], counts);
    else countInlineTagColors([unit.block], counts);
  }
  return counts;
}

function countInlineCodeAnnotations(blocks, counts = {}) {
  for (const block of blocks) {
    const payload = block[block.type];
    for (const text of payload?.rich_text || []) {
      if (!text.annotations?.code) continue;
      counts.total = (counts.total || 0) + 1;
      const color = text.annotations.color || "default";
      if (color === INLINE_CODE_COLOR && text.annotations.bold) {
        counts.blueBold = (counts.blueBold || 0) + 1;
      } else if (color === INLINE_CODE_COLOR) {
        counts.blueNotBold = (counts.blueNotBold || 0) + 1;
      } else {
        counts.other = (counts.other || 0) + 1;
      }
    }
    if (payload?.children) countInlineCodeAnnotations(payload.children, counts);
  }
  return counts;
}

function countUnitInlineCodeAnnotations(units) {
  const counts = {};
  for (const unit of units) {
    if (unit.kind === "section") countInlineCodeAnnotations([unit.block, ...unit.children], counts);
    else countInlineCodeAnnotations([unit.block], counts);
  }
  return counts;
}

function countCodeLanguages(blocks, counts = {}) {
  for (const block of blocks) {
    if (block.type === "code") {
      const language = block.code?.language || "plain text";
      counts[language] = (counts[language] || 0) + 1;
    }
    const payload = block[block.type];
    if (payload?.children) countCodeLanguages(payload.children, counts);
  }
  return counts;
}

function countUnitCodeLanguages(units) {
  const counts = {};
  for (const unit of units) {
    if (unit.kind === "section") countCodeLanguages([unit.block, ...unit.children], counts);
    else countCodeLanguages([unit.block], counts);
  }
  return counts;
}

async function notionFetch(token, method, endpoint, body, attempt = 1) {
  const response = await fetch(`https://api.notion.com/v1${endpoint}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": DEFAULT_NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: body == null ? undefined : JSON.stringify(body),
  });
  const text = await response.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }

  if (!response.ok) {
    if ((response.status === 429 || response.status >= 500) && attempt < 6) {
      const retryAfter = Number(response.headers.get("retry-after") || 0);
      const delay = retryAfter > 0 ? retryAfter * 1000 : 500 * attempt;
      await new Promise((resolve) => setTimeout(resolve, delay));
      return notionFetch(token, method, endpoint, body, attempt + 1);
    }
    throw new Error(`${method} ${endpoint} failed: ${data.message || text}`);
  }
  return data;
}

async function notionMultipartFetch(token, endpoint, form, attempt = 1) {
  const response = await fetch(`https://api.notion.com/v1${endpoint}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": DEFAULT_NOTION_VERSION,
    },
    body: form,
  });
  const text = await response.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }

  if (!response.ok) {
    if ((response.status === 429 || response.status >= 500) && attempt < 6) {
      const retryAfter = Number(response.headers.get("retry-after") || 0);
      const delay = retryAfter > 0 ? retryAfter * 1000 : 500 * attempt;
      await new Promise((resolve) => setTimeout(resolve, delay));
      return notionMultipartFetch(token, endpoint, form, attempt + 1);
    }
    throw new Error(`POST ${endpoint} failed: ${data.message || text}`);
  }
  return data;
}

async function getAllChildren(token, blockId) {
  const results = [];
  let cursor = "";
  do {
    const params = new URLSearchParams({ page_size: "100" });
    if (cursor) params.set("start_cursor", cursor);
    const data = await notionFetch(token, "GET", `/blocks/${blockId}/children?${params}`);
    results.push(...data.results);
    cursor = data.has_more ? data.next_cursor : "";
  } while (cursor);
  return results;
}

async function mapLimit(items, limit, callback) {
  let nextIndex = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (nextIndex < items.length) {
      const currentIndex = nextIndex;
      nextIndex += 1;
      await callback(items[currentIndex], currentIndex);
    }
  });
  await Promise.all(workers);
}

async function archiveTopLevelChildren(token, pageId, concurrency) {
  const children = await getAllChildren(token, pageId);
  await mapLimit(children, concurrency, async (child) => {
    await notionFetch(token, "PATCH", `/blocks/${child.id}`, { in_trash: true });
  });
  return children.length;
}

async function appendChildren(token, blockId, children) {
  const created = [];
  for (let index = 0; index < children.length; index += 80) {
    const chunk = children.slice(index, index + 80);
    if (chunk.length === 0) continue;
    const data = await notionFetch(token, "PATCH", `/blocks/${blockId}/children`, { children: chunk });
    created.push(...data.results);
  }
  return created;
}

async function verifyImageUrls(urls) {
  const failed = [];
  await mapLimit(urls, 5, async (url) => {
    const response = await fetch(url, { method: "HEAD" });
    if (!response.ok) failed.push(`${response.status} ${url}`);
  });
  if (failed.length > 0) {
    throw new Error(`Image URL verification failed:\n${failed.join("\n")}`);
  }
}

async function uploadLocalFile(token, filePath, displayName) {
  const createResult = await notionFetch(token, "POST", "/file_uploads", {});
  const data = await fs.promises.readFile(filePath);
  const filename = displayName || path.basename(filePath);
  const form = new FormData();
  form.append("file", new Blob([data], { type: mimeTypeForFile(filePath) }), filename);
  const sendResult = await notionMultipartFetch(token, `/file_uploads/${createResult.id}/send`, form);
  if (sendResult.status !== "uploaded") {
    throw new Error(`File upload failed for ${filePath}: status ${sendResult.status}`);
  }
  return sendResult;
}

async function resolveLocalFileUploads(token, blocks, context) {
  for (const block of blocks) {
    if (block._localImage) {
      const upload = await uploadLocalFile(token, block._localImage.absolute, block._localImage.name);
      block.image = {
        caption: [],
        type: "file_upload",
        file_upload: { id: upload.id },
      };
      context.uploadedFiles.push({
        type: "image",
        name: block._localImage.name,
        path: block._localImage.absolute,
        id: upload.id,
      });
      delete block._localImage;
    }

    if (block._localFile) {
      const upload = await uploadLocalFile(token, block._localFile.absolute, block._localFile.name);
      block.file = {
        caption: [],
        type: "file_upload",
        file_upload: { id: upload.id },
      };
      context.uploadedFiles.push({
        type: "file",
        name: block._localFile.name,
        path: block._localFile.absolute,
        id: upload.id,
      });
      delete block._localFile;
    }

    const payload = block[block.type];
    if (payload?.children) await resolveLocalFileUploads(token, payload.children, context);
  }
}

async function resolveUnitLocalFileUploads(token, units, context) {
  for (const unit of units) {
    if (unit.kind === "section") await resolveLocalFileUploads(token, [unit.block, ...unit.children], context);
    else await resolveLocalFileUploads(token, [unit.block], context);
  }
}

async function publish(options, context, units) {
  const token = loadNotionToken();
  if (!token) throw new Error("Missing NOTION_TOKEN. Set env var or configure notionApi MCP token.");

  if (context.imageUrls.length > 0) await verifyImageUrls(context.imageUrls);
  if (context.fileUploadPaths.length > 0 || context.imageUploadPaths.length > 0) {
    await resolveUnitLocalFileUploads(token, units, context);
  }

  const archived = options.replace
    ? await archiveTopLevelChildren(token, options.pageId, options.archiveConcurrency)
    : 0;

  const topBlocks = units.map((unit) => unit.block);
  const createdTopBlocks = await appendChildren(token, options.pageId, topBlocks);
  if (createdTopBlocks.length !== units.length) {
    throw new Error(`Top-level block count mismatch: ${createdTopBlocks.length}/${units.length}`);
  }

  let sections = 0;
  let nestedChildren = 0;
  for (let index = 0; index < units.length; index += 1) {
    const unit = units[index];
    if (unit.kind !== "section") continue;
    sections += 1;
    const created = createdTopBlocks[index];
    const childBlocks = await appendChildren(token, created.id, unit.children);
    nestedChildren += childBlocks.length;
  }

  const topChildren = await getAllChildren(token, options.pageId);
  const toggleHeading3 = topChildren.filter(
    (block) => block.type === "heading_3" && block.heading_3?.is_toggleable,
  ).length;

  return {
    archived,
    topCreated: createdTopBlocks.length,
    nestedCreated: { sections, children: nestedChildren },
    verifiedTopLevel: topChildren.length,
    verifiedToggleHeading3: toggleHeading3,
    uploadedFiles: context.uploadedFiles.map((file) => ({ name: file.name, id: file.id })),
  };
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }
  if (!options.input) throw new Error("Missing --input <source.md>.");
  if (!options.pageId) throw new Error("Missing --page-id <notion-page-id>.");
  if (!options.quizToggleLabel) throw new Error("--quiz-toggle-label cannot be empty.");

  options.input = path.resolve(options.input);
  options.pageId = normalizePageId(options.pageId);
  if (!options.pageId) throw new Error("Could not parse --page-id.");

  const repoRoot = gitRoot(path.dirname(options.input));
  const context = {
    markdownDir: path.dirname(options.input),
    heading3Toggles: options.heading3Toggles,
    quizToggleLabel: options.quizToggleLabel,
    imageMode: options.imageMode,
    fileUpload: options.fileUpload,
    imageUrls: [],
    imageUploadPaths: [],
    fileUploadPaths: [],
    uploadedFiles: [],
    gitFiles: repoRoot ? buildGitFileMap(repoRoot) : new Map(),
    githubRawBase: options.githubRawBase,
  };

  if (options.imageMode === "github-raw") {
    if (!repoRoot) throw new Error("Git repository is required for --image-mode github-raw.");
    context.githubRawBase = options.githubRawBase || inferGithubRawBase(repoRoot);
  }

  const sourceText = fs.readFileSync(options.input, "utf8");
  const units = buildUnits(sourceText, context);
  const counts = countUnits(units);
  const sourceImageCount = (sourceText.match(/^\s*>?\s*!\[/gm) || []).length;
  const sourceFileCount = (sourceText.match(/^\s*>?\s*\[[^\]]+\]\([^)]+\.(?:zip|pdf|pptx|xlsx|docx|csv|txt)(?:[?#][^)]*)?\)$/gim) || []).length;
  const sourceQuizCount = (sourceText.match(/^\s*-\s*(정답 확인하기|정답 및 해설)\s*$/gm) || []).length;
  const generatedQuizToggleCount = countUnitQuizToggles(units, options.quizToggleLabel);
  const sectionCount = units.filter((unit) => unit.kind === "section").length;

  if ((counts.image || 0) !== sourceImageCount && options.imageMode !== "placeholder") {
    throw new Error(`Image count mismatch: generated ${counts.image || 0}, source ${sourceImageCount}`);
  }
  if ((counts.file || 0) !== sourceFileCount && options.fileUpload) {
    throw new Error(`File count mismatch: generated ${counts.file || 0}, source ${sourceFileCount}`);
  }
  if (generatedQuizToggleCount !== sourceQuizCount) {
    throw new Error(`Quiz toggle count mismatch: generated ${generatedQuizToggleCount}, source ${sourceQuizCount}`);
  }

  const plan = {
    input: options.input,
    pageId: options.pageId,
    dryRun: options.dryRun,
    replace: options.replace,
    heading3Toggles: options.heading3Toggles,
    quizToggleLabel: options.quizToggleLabel,
    imageMode: options.imageMode,
    fileUpload: options.fileUpload,
    topLevelBlocks: units.length,
    toggleHeading3: sectionCount,
    imageUrls: context.imageUrls.length,
    localImageUploads: context.imageUploadPaths.length,
    sourceFileCount,
    localFileUploads: context.fileUploadPaths.length,
    sourceQuizCount,
    generatedQuizToggleCount,
    generatedCounts: counts,
    codeLanguageCounts: countUnitCodeLanguages(units),
    inlineTagColorCounts: countUnitInlineTagColors(units),
    inlineCodeAnnotationCounts: countUnitInlineCodeAnnotations(units),
  };

  if (options.dryRun) {
    console.log(JSON.stringify({ plan }, null, 2));
    return;
  }

  publish(options, context, units)
    .then((result) => {
      console.log(JSON.stringify({ plan, result }, null, 2));
    })
    .catch((error) => {
      console.error(error instanceof Error ? error.message : String(error));
      process.exit(1);
    });
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
