# Notion Format Rules

These rules are based on the `codeit-fs-javascript` Notion formatting records.

## Current Rule

- Keep the source Markdown as the single source of truth.
- Create Notion import Markdown as a derivative file.
- Use `_notion` or an equivalent suffix for Notion files.
- Treat Notion formatting as structural conversion, not content editing.
- Prefer targeted Notion block updates for narrow changes.
- When the user explicitly asks for a whole-page replacement through the Notion API, use the formatter-generated `_notion.md` file and pass `--replace`.
- Keep Markdown heading depth to `#`, `##`, `###`, and `####`.
- Use `# N장: 제목` for chapter headings.
- Use `## N-XX 제목` or `## N-XX. 제목` for section headings.
- Do not add Markdown backticks or inline code annotations to heading text. If a heading includes an HTML tag or code-like fragment, keep it as ordinary heading text.
- Keep body heading structure by default. Do not wrap every `##` section in a toggle.
- Convert `### NN. ...` course items into toggleable Notion `heading_3` blocks.
- Upload Markdown blockquotes beginning with `>` as Notion `quote` blocks so the visible left bar is preserved.
- Use Markdown blockquotes and Notion `quote` blocks only for `#스크립트` instructor speech. Do not use the visible left bar (`|`) for student-facing concept explanations, definitions, code explanations, or summaries.
- Upload Markdown unordered list lines beginning with `-` or `*` as Notion `bulleted_list_item` blocks, except quiz answer markers such as `- 정답 및 해설`.
- Upload Markdown ordered list lines beginning with `1.` or `1)` as Notion `numbered_list_item` blocks.
- Preserve Markdown list indentation as nested Notion list children.
- Upload top-level Markdown list items with indented non-list child content as Notion `toggle` blocks. Notion exports some toggles as `- 제목` followed by indented paragraphs, code blocks, images, or files.

## Course Tag Rule

- Normalize `#Quiz` to `#퀴즈`.
- Apply tag colors only to the exact tag text inside `heading_3` rich text.
- `#스크립트`: gray background.
- `#퀴즈`: yellow background.
- `#실습`: blue background.
- Any other hashtag such as `#Video`: pink background.
- Do not color the entire heading block. Keep heading block color as `default`.

## Script Rule

- Source Markdown can keep lecture scripts inside fenced code blocks.
- Source Markdown can keep lecture scripts as Markdown blockquotes when the expected Notion view should show the left quote bar.
- Concept content outside `#스크립트` should be ordinary paragraphs, lists, or subheadings, not quote blocks.
- When publishing to Notion, code fences inside a `#스크립트` section are not uploaded as code blocks.
- Upload script fences as readable gray-background paragraphs.
- Render `**bold**` inside script fences as Notion bold rich text.
- Render inline backtick text inside script fences as Notion inline code.
- Preserve real code examples outside `#스크립트` sections as Notion code blocks.
- Prefer plain inline code such as `` `<title>` `` over nested bold inline code such as `` **`<title>`** ``. The publisher normalizes nested bold inline code to Notion inline code so visible backticks do not remain after upload.
- Apply inline code styling only to non-heading explanatory content.
- Render Markdown inline code created with backticks as Notion inline code with text color `blue` and no bold annotation.
- Do not apply the inline-code blue-only text rule to fenced code blocks.

## Quiz Rule

- Keep the `#퀴즈` section as a toggleable course item.
- Keep individual quiz questions visible.
- Collapse only answer/explanation content.
- In the default API publishing workflow, keep quiz answer/explanation content as a `- 정답 및 해설` marker followed by indented `정답:` and `해설:` lines.
- Upload `정답 확인하기` and `정답 및 해설` markers as a Notion toggle titled `정답 및 해설`.
- If `정답:` and `해설:` are already nested below a `- 정답 및 해설` marker, leave them as Markdown in `_notion.md`. The API publisher should create the Notion toggle; the formatter must not insert HTML `<details>` inside the answer content.
- Render `**문제 N. [유형]** 질문` as a separated question header and body for readability.
- Add a divider between quiz questions during API publishing.
- Add improved or additional quiz questions inside the original quiz section. Do not create a separate `문제 은행` section unless the source course already uses one.

## Asset Rule

- Preserve real fenced code blocks outside `#스크립트` sections.
- Preserve Mermaid as fenced `mermaid` blocks.
- If a fenced code block has no language tag but its contents look like HTML, set the generated Markdown fence and Notion code block language to `html`.
- Escape generic-like text that can be parsed as HTML, such as `Response<UserResponse>`.
- If local images are included, replace image lines with `[[NOTION_IMAGE_XX]] file | alt` markers and create a separate upload guide.
- During Notion API publishing, upload local images as external image blocks using GitHub raw URLs.
- During Notion API publishing, upload standalone local file links such as `[signup.zip](...)`, `[sample.pdf](...)`, and `[deck.pptx](...)` as Notion file blocks through the File Upload API.
- Do not render local downloadable files as plain `filename (encoded/path.zip)` text.

## Legacy AWS Rule

Older AWS material used a stricter Notion bundle script:

- Source: `교재/1_교재.md`
- Text output: `교재/1_교재_notion.md`
- Image guide: `교재/1_교재_notion_images.md`
- Image folder: `교재/1_교재_notion_images/`
- Chapter heading style: `# 제 N장: 제목`
- Every `##` section was converted to `<details>/<summary><strong>...</strong></summary>`.
- Standalone `---` lines were removed.
- Local images were copied into the image folder and replaced with `[[NOTION_IMAGE_XX]]` markers.

Use the legacy rule only when matching an existing legacy course structure is more important than the current general rule.

## Upload Checklist

- Confirm the upload file is the `_notion.md` file, not the source Markdown.
- Check heading depth.
- Check chapter and section numbering.
- Check code fences and language tags.
- Check that script sections are readable paragraphs in Notion, not code blocks with visible Markdown syntax.
- Check `details` open/close counts only when using legacy section toggles or manual import output.
- Check quiz answer toggles.
- Check quiz question separation and answer toggle readability.
- Check generic escape output.
- If image markers exist, upload images in marker order and replace marker lines in Notion.
- Check downloadable file links are Notion file blocks with download URLs.
