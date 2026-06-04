#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

function printHelp() {
  console.log(`Usage:
  node format_notion_markdown.mjs --input <source.md> [options]

Options:
  --input <path>          Source Markdown file. A positional path also works.
  --output <path>         Output Markdown file. Default: <source>_notion.md
  --bundle-images         Copy local images and replace image lines with markers.
  --section-toggles       Legacy mode: wrap every ## section in details/summary.
  --chapter-style <mode>  plain | je | preserve. Default: plain.
  --no-toc                Do not add a top table-of-contents toggle.
  --strict                Exit non-zero when warnings are emitted.
  --dry-run               Print the summary without writing files.
  --help                  Show this help.
`);
}

function parseArgs(argv) {
  const options = {
    input: "",
    output: "",
    bundleImages: false,
    sectionToggles: false,
    chapterStyle: "plain",
    toc: true,
    strict: false,
    dryRun: false,
  };

  const positional = [];
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else if (arg === "--input" || arg === "-i") {
      options.input = argv[++index] ?? "";
    } else if (arg === "--output" || arg === "-o") {
      options.output = argv[++index] ?? "";
    } else if (arg === "--bundle-images") {
      options.bundleImages = true;
    } else if (arg === "--section-toggles") {
      options.sectionToggles = true;
    } else if (arg === "--chapter-style") {
      options.chapterStyle = argv[++index] ?? "";
    } else if (arg === "--no-toc") {
      options.toc = false;
    } else if (arg === "--strict") {
      options.strict = true;
    } else if (arg === "--dry-run") {
      options.dryRun = true;
    } else if (arg.startsWith("-")) {
      throw new Error(`Unknown option: ${arg}`);
    } else {
      positional.push(arg);
    }
  }

  if (!options.input && positional.length > 0) options.input = positional[0];
  if (!["plain", "je", "preserve"].includes(options.chapterStyle)) {
    throw new Error("--chapter-style must be one of: plain, je, preserve");
  }
  return options;
}

function defaultOutputPath(inputPath) {
  const parsed = path.parse(inputPath);
  return path.join(parsed.dir, `${parsed.name}_notion${parsed.ext || ".md"}`);
}

function countCodeFences(lines) {
  return lines.filter((line) => line.trim().startsWith("```")).length;
}

function isCodeFence(line) {
  return line.trim().startsWith("```");
}

function parseCodeFence(line) {
  const match = String(line ?? "").match(/^(\s*)```([A-Za-z0-9_-]*)\s*$/);
  if (!match) return null;
  return { indent: match[1], language: match[2] || "" };
}

function looksLikeHtmlCode(content) {
  const value = String(content ?? "").trim();
  if (!value) return false;
  return /^<!doctype\s+html\b/i.test(value) || /<\/?[A-Za-z][\w:-]*(?:\s+[^<>]*)?>/.test(value);
}

function inferCodeFenceLanguage(lines, startIndex, declaredLanguage) {
  if (declaredLanguage) return declaredLanguage;

  const code = [];
  for (let index = startIndex + 1; index < lines.length; index += 1) {
    if (isCodeFence(lines[index])) break;
    code.push(lines[index]);
  }

  return looksLikeHtmlCode(code.join("\n")) ? "html" : "";
}

function sanitizeFileName(name) {
  const sanitized = name
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return sanitized || "image";
}

function convertTopHeading(line, chapterStyle) {
  if (chapterStyle === "preserve") return line;

  let match = line.match(/^#\s+(?:제\s*)?(\d+)장[.:]\s+(.+)$/);
  if (match) {
    return chapterStyle === "je"
      ? `# 제 ${match[1]}장: ${match[2]}`
      : `# ${match[1]}장: ${match[2]}`;
  }

  match = line.match(/^#\s+부록[.:]\s+(.+)$/);
  if (match) return `# 부록: ${match[1]}`;

  return line;
}

function isChapterHeading(line) {
  return /^#\s+(?:제\s*)?\d+장[.:]\s+/.test(line) || /^#\s+부록[.:]\s+/.test(line);
}

function collectToc(lines, chapterStyle) {
  const toc = [];
  let inCode = false;

  for (const line of lines) {
    if (isCodeFence(line)) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;
    if (isChapterHeading(line)) {
      toc.push(convertTopHeading(line, chapterStyle).replace(/^#\s+/, ""));
    }
  }

  return toc;
}

function buildImageMarker(index, bundleFileName, alt) {
  return `[[NOTION_IMAGE_${String(index).padStart(2, "0")}]] ${bundleFileName} | ${alt}`;
}

function isImageLine(line) {
  return /^!\[(.*?)\]\((.*?)\)\s*$/.test(line.trim());
}

function previousContextLine(lines, index) {
  for (let i = index - 1; i >= 0; i -= 1) {
    if (!lines[i].trim() || isImageLine(lines[i])) continue;
    return lines[i].trim();
  }
  return "";
}

function nextContextLine(lines, index) {
  for (let i = index + 1; i < lines.length; i += 1) {
    if (!lines[i].trim() || isImageLine(lines[i])) continue;
    return lines[i].trim();
  }
  return "";
}

function isRemotePath(value) {
  return /^https?:\/\//i.test(value) || /^data:/i.test(value);
}

function normalizeCourseTags(line) {
  return line.replaceAll("#Quiz", "#퀴즈");
}

function escapeGenericSyntax(line) {
  return normalizeCourseTags(line).replace(/\b([A-Za-z_$][\w.$]*)<([^<>\n`]+)>/g, (_match, name, inner) => {
    if (/^\s*\//.test(inner)) return `${name}<${inner}>`;
    return `${name}&lt;${inner}&gt;`;
  });
}

function makeQuizAnswerMarkerBlock(indent, answer, explanation) {
  const childIndent = `${indent}  `;
  return [
    `${indent}- 정답 및 해설`,
    `${childIndent}정답: ${answer.trim()}`,
    `${childIndent}해설: ${explanation.trim()}`,
  ];
}

function matchCombinedAnswer(line) {
  return line.match(/^(\s*)(?:[-*]\s+)?\*\*정답 및 해설:\*\*\s*([A-Z0-9가-힣]+)[.)]?\s*(.+)$/);
}

function matchAnswerOnly(line) {
  return line.match(/^(\s*)(?:[-*]\s+)?(?:\*\*)?정답(?:\*\*)?:\s*([A-Z0-9가-힣]+)[.)]?\s*$/);
}

function matchExplanation(line) {
  return line.match(/^(\s*)(?:[-*]\s+)?(?:\*\*)?해설(?:\*\*)?:\s*(.+)$/);
}

function findNextNonEmpty(lines, startIndex) {
  for (let index = startIndex; index < lines.length; index += 1) {
    if (lines[index].trim()) return index;
  }
  return -1;
}

function transformMarkdown(sourceText, options) {
  const lines = sourceText.split(/\r?\n/);
  const outputLines = [];
  const imageEntries = [];
  const warnings = [];
  let inCode = false;
  let sectionOpen = false;
  let currentChapter = "";
  let currentSection = "";
  let imageIndex = 0;
  let quizToggleCount = 0;
  let codeLanguageInferenceCount = 0;

  if (options.toc) {
    const toc = collectToc(lines, options.chapterStyle);
    if (toc.length > 0) {
      outputLines.push("<details>");
      outputLines.push("<summary>목차 (Notion 토글)</summary>");
      outputLines.push("");
      for (const item of toc) outputLines.push(`- ${item}`);
      outputLines.push("</details>");
      outputLines.push("");
    }
  }

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];

    if (isCodeFence(line)) {
      if (!inCode) {
        const fence = parseCodeFence(line);
        const language = fence ? inferCodeFenceLanguage(lines, index, fence.language) : "";
        if (fence && language && !fence.language) {
          outputLines.push(`${fence.indent}\`\`\`${language}`);
          codeLanguageInferenceCount += 1;
        } else {
          outputLines.push(line);
        }
      } else {
        outputLines.push(line);
      }
      inCode = !inCode;
      continue;
    }

    if (inCode) {
      outputLines.push(line);
      continue;
    }

    const deepHeading = line.match(/^(#{5,})\s+(.+)$/);
    if (deepHeading) {
      warnings.push(`Line ${index + 1}: heading level ${deepHeading[1].length} converted to ####.`);
      outputLines.push(`#### ${deepHeading[2]}`);
      continue;
    }

    if (isChapterHeading(line)) {
      if (sectionOpen) {
        outputLines.push("</details>");
        outputLines.push("");
        sectionOpen = false;
      }
      const converted = convertTopHeading(line, options.chapterStyle);
      currentChapter = converted.replace(/^#\s+/, "");
      outputLines.push(converted);
      outputLines.push("");
      continue;
    }

    const sectionMatch = line.match(/^##\s+(.+)$/);
    if (sectionMatch) {
      currentSection = normalizeCourseTags(sectionMatch[1]);
      if (!/^\d+-\d{2}\.?\s+/.test(currentSection) && !/^#퀴즈\s+/.test(currentSection)) {
        warnings.push(`Line ${index + 1}: section heading is not N-XX format: ${currentSection}`);
      }

      if (options.sectionToggles) {
        if (sectionOpen) {
          outputLines.push("</details>");
          outputLines.push("");
        }
        outputLines.push("<details>");
        outputLines.push(`<summary><strong>${currentSection}</strong></summary>`);
        outputLines.push("");
        sectionOpen = true;
        continue;
      }

      outputLines.push(`## ${currentSection}`);
      continue;
    }

    if (/^---\s*$/.test(line)) {
      continue;
    }

    const imageMatch = line.trim().match(/^!\[(.*?)\]\((.*?)\)\s*$/);
    if (imageMatch && options.bundleImages) {
      const alt = imageMatch[1] || `image-${imageIndex + 1}`;
      const imageSource = imageMatch[2];

      if (isRemotePath(imageSource)) {
        warnings.push(`Line ${index + 1}: remote image left unchanged: ${imageSource}`);
        outputLines.push(line);
        continue;
      }

      const absoluteSource = path.resolve(path.dirname(options.input), imageSource);
      if (!fs.existsSync(absoluteSource)) {
        warnings.push(`Line ${index + 1}: image file not found and left unchanged: ${imageSource}`);
        outputLines.push(line);
        continue;
      }

      imageIndex += 1;
      const extension = path.extname(absoluteSource) || ".png";
      const sourceBaseName = path.basename(absoluteSource, extension);
      const bundleFileName = `${String(imageIndex).padStart(2, "0")}_${sanitizeFileName(sourceBaseName)}${extension}`;
      const bundlePath = path.join(options.imageDir, bundleFileName);
      const marker = buildImageMarker(imageIndex, bundleFileName, alt);

      imageEntries.push({
        index: imageIndex,
        alt,
        marker,
        chapter: currentChapter,
        section: currentSection,
        sourceLine: index + 1,
        sourcePath: path.relative(path.dirname(options.output), absoluteSource),
        bundlePath: path.relative(path.dirname(options.output), bundlePath),
        absoluteSource,
        bundlePathAbsolute: bundlePath,
        before: previousContextLine(lines, index),
        after: nextContextLine(lines, index),
      });

      outputLines.push(marker);
      outputLines.push("");
      continue;
    }

    const combinedAnswer = matchCombinedAnswer(line);
    if (combinedAnswer) {
      const [, indent, answer, explanation] = combinedAnswer;
      outputLines.push(...makeQuizAnswerMarkerBlock(indent, answer, explanation));
      quizToggleCount += 1;
      continue;
    }

    const answerOnly = matchAnswerOnly(line);
    if (answerOnly && !/^\s{2,}/.test(line)) {
      const explanationIndex = findNextNonEmpty(lines, index + 1);
      if (explanationIndex > -1) {
        const explanation = matchExplanation(lines[explanationIndex]);
        if (explanation) {
          const [, indent, answer] = answerOnly;
          outputLines.push(...makeQuizAnswerMarkerBlock(indent, answer, explanation[2]));
          quizToggleCount += 1;
          index = explanationIndex;
          continue;
        }
      }
    }

    outputLines.push(escapeGenericSyntax(line));
  }

  if (sectionOpen) outputLines.push("</details>");

  return { lines, outputLines, imageEntries, warnings, quizToggleCount, codeLanguageInferenceCount };
}

function buildImageGuide(options, imageEntries) {
  const guideLines = [];
  guideLines.push(`# ${path.basename(options.output)} Notion 이미지 업로드 가이드`);
  guideLines.push("");
  guideLines.push(`- 기준 원본: \`${path.relative(process.cwd(), options.input)}\``);
  guideLines.push(`- Notion 텍스트 반영본: \`${path.relative(process.cwd(), options.output)}\``);
  guideLines.push(`- 이미지 번들 폴더: \`${path.relative(process.cwd(), options.imageDir)}\``);
  guideLines.push(`- 이미지 수: \`${imageEntries.length}\``);
  guideLines.push("");
  guideLines.push("텍스트는 Notion import용 Markdown으로 먼저 반영하고, 이미지는 아래 순서대로 별도 업로드합니다.");
  guideLines.push("");

  for (const entry of imageEntries) {
    guideLines.push(`## ${String(entry.index).padStart(2, "0")}. ${entry.alt}`);
    guideLines.push("");
    guideLines.push(`- 장: \`${entry.chapter}\``);
    guideLines.push(`- 절: \`${entry.section}\``);
    guideLines.push(`- 마커: \`${entry.marker}\``);
    guideLines.push(`- 원본 줄: \`${entry.sourceLine}\``);
    guideLines.push(`- 번들 파일: \`${entry.bundlePath}\``);
    guideLines.push(`- 원본 파일: \`${entry.sourcePath}\``);
    guideLines.push("- 업로드 방식: Notion에서 이 마커를 검색한 뒤 해당 줄을 이미지로 교체");
    guideLines.push(`- 앞 문장: ${entry.before}`);
    guideLines.push(`- 뒤 문장: ${entry.after}`);
    guideLines.push("");
  }

  return guideLines.join("\n");
}

function validateOutput(sourceLines, outputLines, options, imageEntries, warnings) {
  const sourceFenceCount = countCodeFences(sourceLines);
  const outputFenceCount = countCodeFences(outputLines);
  if (sourceFenceCount !== outputFenceCount) {
    warnings.push(`Code fence count changed: source ${sourceFenceCount}, output ${outputFenceCount}.`);
  }

  const outputText = outputLines.join("\n");
  const detailsOpen = (outputText.match(/<details>/g) ?? []).length;
  const detailsClose = (outputText.match(/<\/details>/g) ?? []).length;
  if (detailsOpen !== detailsClose) {
    warnings.push(`details tag count mismatch: open ${detailsOpen}, close ${detailsClose}.`);
  }

  const deepHeading = outputLines.find((line) => /^#{5,}\s+/.test(line));
  if (deepHeading) warnings.push(`Deep heading remains: ${deepHeading}`);

  if (options.bundleImages && imageEntries.length === 0) {
    const hasMarkdownImages = sourceLines.some((line) => isImageLine(line));
    if (hasMarkdownImages) warnings.push("Markdown image lines exist, but no local images were bundled.");
  }

  return {
    sourceFenceCount,
    outputFenceCount,
    detailsOpen,
    detailsClose,
  };
}

function writeOutputs(options, outputText, imageEntries) {
  if (options.dryRun) return;

  fs.mkdirSync(path.dirname(options.output), { recursive: true });

  if (options.bundleImages && imageEntries.length > 0) {
    fs.rmSync(options.imageDir, { recursive: true, force: true });
    fs.mkdirSync(options.imageDir, { recursive: true });
    for (const entry of imageEntries) {
      fs.copyFileSync(entry.absoluteSource, entry.bundlePathAbsolute);
    }
    fs.writeFileSync(options.imageGuide, buildImageGuide(options, imageEntries));
  }

  fs.writeFileSync(options.output, outputText);
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }
  if (!options.input) throw new Error("Missing --input <source.md>.");

  options.input = path.resolve(options.input);
  options.output = path.resolve(options.output || defaultOutputPath(options.input));

  const outputParsed = path.parse(options.output);
  options.imageDir = path.join(outputParsed.dir, `${outputParsed.name}_images`);
  options.imageGuide = path.join(outputParsed.dir, `${outputParsed.name}_images.md`);

  const sourceText = fs.readFileSync(options.input, "utf8");
  const { lines, outputLines, imageEntries, warnings, quizToggleCount, codeLanguageInferenceCount } = transformMarkdown(sourceText, options);
  const validation = validateOutput(lines, outputLines, options, imageEntries, warnings);
  const outputText = outputLines.join("\n");

  writeOutputs(options, outputText, imageEntries);

  const summary = {
    input: options.input,
    output: options.output,
    dryRun: options.dryRun,
    toc: options.toc,
    sectionToggles: options.sectionToggles,
    chapterStyle: options.chapterStyle,
    quizToggleCount,
    codeLanguageInferenceCount,
    imageCount: imageEntries.length,
    imageDir: imageEntries.length > 0 ? options.imageDir : null,
    imageGuide: imageEntries.length > 0 ? options.imageGuide : null,
    validation,
    warnings,
  };

  console.log(JSON.stringify(summary, null, 2));

  if (options.strict && warnings.length > 0) {
    process.exitCode = 1;
  }
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
