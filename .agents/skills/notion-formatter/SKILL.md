---
name: notion-formatter
description: Repository-local skill for codeit-fs-15. Convert Markdown course documents into Notion import-ready Markdown and publish them through the Notion API. Use when the user asks for Notion 포맷터, 노션 포맷터, Notion용 md, _notion.md, Markdown import for Notion, quiz answer toggles, image upload markers, or Notion formatting checks for Codeit course materials.
---

# Notion Formatter

Convert source Markdown into a separate Notion import file without changing the source document.

This is a repository-local skill for `/Users/winverse/Desktop/codeit-fs-15`.

- Do not install or maintain this skill under global skill directories such as `~/.codex/skills` or `~/.agents/skills`.
- Keep this skill under `.agents/skills/notion-formatter`, the repository skill path scanned by Codex.
- Run commands from the repository root with `.agents/skills/notion-formatter/...` paths.
- Keep formatter behavior changes in this repository unless the user explicitly asks for a global skill.

## Source Rule

Never treat the Notion file as the source of truth.

- Edit content in the source file first, usually `교재/1_교재.md`, `textbook/textbook.md`, or the current course Markdown.
- Generate a separate `_notion.md` file only when Notion import or upload is needed.
- Use Notion formatting for structure only. Do not rewrite concepts, code, or prose during the formatting pass.
- If content is wrong, fix the source Markdown and regenerate the Notion file.
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

When publishing a whole generated document through Notion MCP/API, publish a formatter-generated Markdown file. The source file remains the source of truth, but the full-document upload path is:

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

The wrapper regenerates `_notion.md` first and then uploads that generated file. It does not replace existing page content unless `--replace` is explicitly passed.

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
- Existing page content is not replaced by default. The publisher archives/trashes current top-level blocks only when `--replace` is explicitly passed.
- Markdown blockquotes beginning with `>` are uploaded as Notion `quote` blocks so instructor script text keeps the visible left bar.
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
- In `#스크립트` sections, fenced code blocks are uploaded as readable gray-background paragraphs, not Notion code blocks.
- In uploaded script paragraphs, Markdown `**bold**` becomes Notion bold text and inline backtick text becomes Notion inline code.
- Real code examples outside `#스크립트` sections remain Notion code blocks.

Inline code rules:

- Prefer plain inline code such as `` `<title>` `` instead of nested bold inline code such as `` **`<title>`** `` in source Markdown.
- In Notion API publishing, nested bold inline code is normalized to inline code rich text so visible backticks do not remain in Notion.
- Inline code created from Markdown backticks is uploaded as Notion inline code with text color `blue` and bold enabled.
- This blue and bold text rule applies only to inline code, not fenced code blocks.

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
