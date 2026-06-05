#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

function printHelp() {
  console.log(`Usage:
  node format_and_publish_notion_course.mjs --input <course.md> --page-id <notion-page-id> [options]

Options:
  --input <path>                 Source Markdown file. A positional path also works.
  --output <path>                Formatter output. Default: <source>_notion.md
  --page-id <id-or-url>          Notion page ID or Notion page URL.
  --replace                      Explicitly replace existing page content.
  --append                       Explicitly append generated content without replacing.
  --no-replace                   Deprecated alias for --append.
  --no-heading3-toggles          Keep "### NN. ..." headings as normal heading_3 blocks.
  --quiz-toggle-label <text>     Label for quiz answer toggles. Default: 정답 및 해설.
  --image-mode <mode>            github-raw | file-upload | external | placeholder. Default: github-raw.
  --github-raw-base <url>        Override raw base URL.
  --no-file-upload               Render local downloadable files as text placeholders.
  --archive-concurrency <n>      Existing block archive concurrency. Default: 3.
  --dry-run                      Generate _notion.md and print the upload plan only.
  --help                         Show this help.
`);
}

function parseArgs(argv) {
  const options = {
    input: "",
    output: "",
    pageId: "",
    replace: false,
    append: false,
    heading3Toggles: true,
    quizToggleLabel: "정답 및 해설",
    imageMode: "github-raw",
    githubRawBase: "",
    fileUpload: true,
    archiveConcurrency: "3",
    dryRun: false,
  };
  const positional = [];

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") options.help = true;
    else if (arg === "--input" || arg === "-i") options.input = argv[++index] ?? "";
    else if (arg === "--output" || arg === "-o") options.output = argv[++index] ?? "";
    else if (arg === "--page-id") options.pageId = argv[++index] ?? "";
    else if (arg === "--replace") options.replace = true;
    else if (arg === "--append") options.append = true;
    else if (arg === "--no-replace") options.append = true;
    else if (arg === "--heading3-toggles") options.heading3Toggles = true;
    else if (arg === "--no-heading3-toggles") options.heading3Toggles = false;
    else if (arg === "--quiz-toggle-label") options.quizToggleLabel = argv[++index] ?? "";
    else if (arg === "--image-mode") options.imageMode = argv[++index] ?? "";
    else if (arg === "--github-raw-base") options.githubRawBase = argv[++index] ?? "";
    else if (arg === "--no-file-upload") options.fileUpload = false;
    else if (arg === "--archive-concurrency") options.archiveConcurrency = argv[++index] ?? "";
    else if (arg === "--dry-run") options.dryRun = true;
    else if (arg.startsWith("-")) throw new Error(`Unknown option: ${arg}`);
    else positional.push(arg);
  }

  if (!options.input && positional.length > 0) options.input = positional[0];
  return options;
}

function defaultOutputPath(inputPath) {
  const parsed = path.parse(inputPath);
  return path.join(parsed.dir, `${parsed.name}_notion${parsed.ext || ".md"}`);
}

function runNode(scriptPath, args) {
  execFileSync(process.execPath, [scriptPath, ...args], {
    stdio: "inherit",
  });
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }
  if (!options.input) throw new Error("Missing --input <source.md>.");
  if (!options.pageId) throw new Error("Missing --page-id <notion-page-id>.");
  if (options.replace && options.append) throw new Error("--replace and --append cannot be used together.");
  if (!options.dryRun && !options.replace && !options.append) {
    throw new Error("Missing publish mode. Use --dry-run for a plan, --replace for explicit whole-page replacement, or --append for explicit append.");
  }

  const scriptDir = path.dirname(fileURLToPath(import.meta.url));
  const formatterScript = path.join(scriptDir, "format_notion_markdown.mjs");
  const publisherScript = path.join(scriptDir, "publish_notion_course.mjs");

  const inputPath = path.resolve(options.input);
  const outputPath = path.resolve(options.output || defaultOutputPath(inputPath));

  if (!fs.existsSync(formatterScript)) throw new Error(`Formatter script not found: ${formatterScript}`);
  if (!fs.existsSync(publisherScript)) throw new Error(`Publisher script not found: ${publisherScript}`);

  runNode(formatterScript, ["--input", inputPath, "--output", outputPath]);

  const publishArgs = [
    "--input",
    outputPath,
    "--page-id",
    options.pageId,
    "--quiz-toggle-label",
    options.quizToggleLabel,
    "--image-mode",
    options.imageMode,
    "--archive-concurrency",
    options.archiveConcurrency,
  ];

  if (options.replace) publishArgs.push("--replace");
  if (options.append) publishArgs.push("--append");
  if (!options.heading3Toggles) publishArgs.push("--no-heading3-toggles");
  if (options.githubRawBase) publishArgs.push("--github-raw-base", options.githubRawBase);
  if (!options.fileUpload) publishArgs.push("--no-file-upload");
  if (options.dryRun) publishArgs.push("--dry-run");

  runNode(publisherScript, publishArgs);
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
