---
name: notion-formatter
description: Repository-local skill for codeit-fs-15. Convert Markdown course documents into Notion import-ready Markdown and publish them through the Notion API. Use when the user asks for Notion 포맷터, 노션 포맷터, Notion용 md, _notion.md, Markdown import for Notion, quiz answer toggles, image upload markers, or Notion import/block-rendering checks. Do not use as the editorial standard for course content, prose, concept explanations, or pedagogical quality.
---

# Notion Formatter

Convert source Markdown into a separate Notion import file without changing the source document. Use this workflow for initial course upload or an explicitly requested whole-page replacement.

This is a repository-local skill for `/Users/winverse/Desktop/codeit-fs-15`.

- Do not install or maintain this skill under global skill directories such as `~/.codex/skills` or `~/.agents/skills`.
- Keep this skill under `.agents/skills/notion-formatter`, the repository skill path scanned by Codex.
- Run commands from the repository root with `.agents/skills/notion-formatter/...` paths.
- Keep formatter behavior changes in this repository unless the user explicitly asks for a global skill.

## Scope Boundary

This skill is a Notion conversion and publishing tool. It is not the source of truth for course content, prose, concept explanations, or pedagogical quality.

- Use `docs/00. 문서 운영/강의자료 검토 및 업로드 절차.md` and `docs/00. 문서 운영/15기 강의자료 개선 기준.md` for student-facing content, tone, concept explanation, original-material preservation, and allowed edit scope.
- Use this skill when generating `_notion.md`, checking Notion import formatting, publishing the first Notion version, or performing an explicitly requested whole-page replacement.
- After a course has already been uploaded once, do not invoke this skill as an editorial standard for a single section. Read the relevant `docs/` criteria, then update only the requested Notion section/block through MCP/API.
- For already-uploaded Notion sections, consult this skill only for Notion rendering details such as code block language, inline code annotations, quote block behavior, file/image upload behavior, or publisher command syntax.

## Stage Rule

Before the first Notion upload, treat the course Markdown as the draft source. After a course has been uploaded once, do not update `강의자료.md` for ordinary corrections; find the uploaded Notion section through MCP/API and update that section directly.

- Before first upload, edit content in the source file first, usually `교재/1_교재.md`, `textbook/textbook.md`, or the current course Markdown.
- Generate a separate `_notion.md` file only when initial Notion import/upload or an explicitly requested whole-page replacement is needed.
- Use Notion formatting for structure only. Do not rewrite concepts, code, or prose during the formatting pass.
- Before first upload, if content is wrong, fix the source Markdown and regenerate the Notion file.
- After first upload, if content is wrong, update only the relevant Notion section/block through MCP/API and leave local Markdown unchanged.
- If only Notion import structure is wrong, fix the formatter or the `_notion.md` derivative.

## Quick Start

Use the bundled formatter script:

```bash
node .agents/skills/notion-formatter/scripts/format_notion_markdown.mjs --input 교재/1_교재.md
```

Default output is next to the source with `_notion` appended:

```text
교재/1_교재.md -> 교재/1_교재_notion.md
```

For source files with local Markdown images, bundle images and replace image lines with upload markers:

```bash
node .agents/skills/notion-formatter/scripts/format_notion_markdown.mjs \
  --input 교재/1_교재.md \
  --bundle-images
```

This creates:

- `교재/1_교재_notion.md`
- `교재/1_교재_notion_images/`
- `교재/1_교재_notion_images.md`

## Publish to Notion

When publishing a whole generated document through Notion MCP/API, publish a formatter-generated Markdown file. This path is for initial upload or an explicitly requested whole-page replacement:

```text
source.md -> format_notion_markdown.mjs -> source_notion.md -> publish_notion_course.mjs -> Notion
```

Use the bundled wrapper only when the user explicitly asks to replace an existing Notion page:

```bash
node .agents/skills/notion-formatter/scripts/format_and_publish_notion_course.mjs \
  --input "courses/01.프로그래밍 시작하기/강의자료.md" \
  --page-id "<notion-page-id-or-url>" \
  --replace
```

The wrapper regenerates `_notion.md` first and then uploads that generated file. It does not replace existing page content unless `--replace` is explicitly passed. After a course has already been uploaded once, prefer direct Notion MCP/API section updates over regenerating Markdown.

Use the lower-level publisher only when `_notion.md` already exists and the user explicitly asked for a whole-page publish:

```bash
node .agents/skills/notion-formatter/scripts/publish_notion_course.mjs \
  --input "courses/01.프로그래밍 시작하기/강의자료_notion.md" \
  --page-id "<notion-page-id-or-url>" \
  --replace
```

Course publisher defaults:

- `##` headings stay as visible section headings.
- `### NN. ...` headings become toggleable `heading_3` blocks.
- Do not add Markdown backticks or inline code annotations to `##`, `###`, or `####` heading text. If a heading includes an HTML tag or code-like fragment, keep it as ordinary heading text.
- Existing page content is not replaced by default. The publisher archives/trashes current top-level blocks only when `--replace` is explicitly passed.
- Markdown blockquotes beginning with `>` are uploaded as Notion `quote` blocks so instructor script text keeps the visible left bar.
- Do not use Markdown blockquotes or Notion `quote` blocks for non-script concept explanations. The visible left bar (`|`) is reserved for `#스크립트`; student-facing concepts should be paragraphs, lists, or subheadings.
- Markdown unordered list lines beginning with `-` or `*` are uploaded as Notion `bulleted_list_item` blocks, except quiz answer markers such as `- 정답 및 해설`.
- Markdown ordered list lines beginning with `1.` or `1)` are uploaded as Notion `numbered_list_item` blocks.
- Indented Markdown list items are uploaded as nested Notion list children instead of flat paragraphs.
- Top-level Markdown list items with indented non-list child content are uploaded as Notion `toggle` blocks. This preserves Notion-exported toggles such as OS-specific install instructions without turning ordinary nested bullet lists into toggles.

Course tag rules:

- `#Quiz` is normalized to `#퀴즈` during formatting and publishing.
- Course tag colors apply only inside `heading_3` rich text.
- Only the exact inline tag text `#스크립트` gets a gray background in Notion.
- Only the exact inline tag text `#퀴즈` gets a yellow background in Notion.
- Only the exact inline tag text `#실습` gets a blue background in Notion.
- Any other `#...` tag inside `heading_3`, such as `#Video`, gets a pink background in Notion.
- Heading block backgrounds stay `default`; do not color the entire heading block.

Script section rules:

- Source Markdown may keep script text inside fenced code blocks for editing convenience.
- Source Markdown may also keep instructor script text as Markdown blockquotes. These are uploaded as Notion quote blocks with the visible left bar.
- Outside `#스크립트`, do not create quote blocks for conceptual explanations, definitions, code explanations, or summaries.
- In `#스크립트` sections, fenced code blocks are uploaded as readable gray-background paragraphs, not Notion code blocks.
- In uploaded script paragraphs, Markdown `**bold**` becomes Notion bold text and inline backtick text becomes Notion inline code.
- Real code examples outside `#스크립트` sections remain Notion code blocks.

Inline code rules:

- Do not use inline code in headings. Apply inline code styling only to body text, lists, quotes, and other non-heading explanatory content.
- Prefer plain inline code such as `` `<title>` `` instead of nested bold inline code such as `` **`<title>`** `` in source Markdown.
- In Notion API publishing, nested bold inline code is normalized to inline code rich text so visible backticks do not remain in Notion.
- Inline code created from Markdown backticks is uploaded as Notion inline code with text color `blue` and no bold annotation.
- This blue-only text rule applies only to inline code, not fenced code blocks.

Quiz section rules:

- Keep the `#퀴즈` section itself as a toggleable `heading_3`.
- Keep quiz questions visible by default; only answers and explanations should be collapsed.
- `정답 확인하기` and `정답 및 해설` source markers are uploaded as `정답 및 해설` quiz toggles.
- In the default API publishing workflow, keep quiz answer content as a `- 정답 및 해설` marker followed by indented `정답:` and `해설:` lines.
- When a source uses `- 정답 및 해설` followed by indented `정답:` and `해설:` lines, keep those lines as Markdown in `_notion.md`; the publisher turns the marker into a Notion toggle. Do not pre-wrap nested answers in HTML `<details>`.
- Render `**문제 N. [유형]** 질문` as a separated question header and body inside Notion for readability.
- Add a divider between quiz questions during publishing.
- Do not create a separate `문제 은행` section when improving existing course quizzes. Add new questions inside the original quiz section unless the source course already has a dedicated bank.

Asset rules:

- Markdown image captions are left empty.
- Local images are uploaded as external Notion image blocks through GitHub raw URLs.
- If local images are not yet available through GitHub raw URLs, publish with `--image-mode file-upload` so the Notion File Upload API uploads the images directly.
- Standalone downloadable file links such as `[signup.zip](...)`, `[sample.pdf](...)`, or `[deck.pptx](...)` are uploaded as Notion `file` blocks.
- Local downloadable files are uploaded through the Notion File Upload API before the page content is replaced.
- Do not render local file links as plain `filename (encoded/path.zip)` text in Notion.

Check the upload plan without changing Notion:

```bash
node .agents/skills/notion-formatter/scripts/format_and_publish_notion_course.mjs \
  --input "courses/01.프로그래밍 시작하기/강의자료.md" \
  --page-id "<notion-page-id-or-url>" \
  --dry-run
```

## Defaults

- Keep `# -> ## -> ### -> ####` heading structure.
- Do not wrap every `##` section in `<details>`.
- Add a top table-of-contents toggle.
- Convert combined quiz answer lines into `- 정답 및 해설` markers so the API publisher can create Notion toggles.
- Remove standalone `---` lines.
- Escape simple TypeScript generic-like text outside code blocks, such as `Response<UserResponse>`.
- Preserve code fences, including `mermaid`.
- For fenced code blocks with no language tag, infer `html` when the code contents look like HTML.
- Keep source and output code fence counts equal.

## Legacy AWS Style

Only use this when the existing course already follows the older AWS Notion style:

```bash
node .agents/skills/notion-formatter/scripts/format_notion_markdown.mjs \
  --input 교재/1_교재.md \
  --section-toggles \
  --chapter-style je \
  --bundle-images
```

This wraps every `##` section in `<details>/<summary>` and uses `# 제 N장: 제목`.

## Validation

After formatting, inspect the script summary.

Required checks:

- No heading deeper than `####` remains.
- Chapter headings follow the selected style.
- Section headings are normally `## N-XX 제목` or `## N-XX. 제목`.
- Source and output code fence counts match.
- `<details>` and `</details>` counts match.
- Quiz answer toggles were created where expected.
- If images were bundled, marker count, image folder count, and image guide entries match.

Use strict mode when formatting should fail on warnings:

```bash
node .agents/skills/notion-formatter/scripts/format_notion_markdown.mjs \
  --input textbook/textbook.md \
  --strict
```

## Reference

Read `references/notion-format-rules.md` before changing the formatter behavior or deciding between the current and legacy styles.
