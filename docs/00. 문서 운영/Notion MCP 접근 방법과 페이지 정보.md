# Notion MCP 접근 방법과 페이지 정보

이 문서는 15기 강의자료 작업에서 Notion MCP/API로 원본 Notion 페이지에 접근하는 방법과, 확인된 과정 페이지 정보를 기록합니다.

## 접근 원칙

- Notion 페이지를 읽거나 수정할 때는 먼저 Notion MCP 연결 권한을 확인합니다.
- 공개 `notion.site` 링크가 열리더라도 Notion MCP에서 같은 페이지를 읽을 수 있다는 뜻은 아닙니다.
- Notion MCP 작업에는 공개 공유 URL보다 워크스페이스 내부 page ID를 우선 사용합니다.
- 페이지 내용을 수정할 때는 로컬 원본 Markdown과 Notion 페이지 중 어느 쪽이 기준본인지 먼저 확인합니다.
- 이 레포의 15기 강의자료 기준본은 `courses/` 아래 Markdown입니다. Notion 페이지는 업로드/검토 대상입니다.
- Notion 반영은 사용자의 명시 요청이 있을 때만 진행합니다.
- Notion 반영 시에는 기존 페이지 내용을 archive 처리하고 formatter로 생성한 `_notion.md`를 통째로 다시 올리는 `replace` 방식을 사용합니다.

## 기본 접근 절차

1. Notion 커넥터가 연결되어 있는지 확인합니다.
2. 제목으로 페이지를 검색합니다.

```json
{
  "query": "01. 프로그래밍 시작하기",
  "query_type": "internal",
  "content_search_mode": "workspace_search",
  "page_size": 10
}
```

3. 검색 결과의 page ID로 페이지 본문을 가져옵니다.

```json
{
  "id": "28c2eda4-01c1-80ee-939f-efd75e0a5305",
  "include_discussions": false
}
```

4. fetch 결과에서 제목, URL, 본문 섹션, 토글, 퀴즈, 이미지, 파일 링크를 확인합니다.
5. 수정이 필요하면 먼저 로컬 기준본인 `courses/` 문서를 고친 뒤, Notion 업로드용 문서를 다시 생성하거나 Notion 페이지 업데이트 절차를 따릅니다.

## 확인된 페이지

| 순서 | 페이지 제목 | Notion MCP page ID | Notion URL | 접근 상태 | 로컬 관련 문서 |
| --- | --- | --- | --- | --- | --- |
| 01 | 01. 프로그래밍 시작하기 | `28c2eda4-01c1-80ee-939f-efd75e0a5305` | `https://www.notion.so/28c2eda401c180ee939fefd75e0a5305` | 검색 및 본문 fetch 확인 | `courses/01.프로그래밍 시작하기/강의자료.md` |
| 02 | 02. 웹 퍼블리싱 시작하기 | `3731831f-3e90-80ad-9117-e9d144b3e3bb` | `https://www.notion.so/02-3731831f3e9080ad9117e9d144b3e3bb` | API 전체 교체 업로드 확인 | `courses/02.웹 퍼블리싱 시작하기/강의자료.md` |

## 01. 프로그래밍 시작하기 접근 결과

2026-06-02에 Notion MCP로 아래 내용을 확인했습니다.

- 검색어: `01. 프로그래밍 시작하기`
- 검색 결과 page ID: `28c2eda4-01c1-80ee-939f-efd75e0a5305`
- 제목: `01. 프로그래밍 시작하기`
- URL: `https://www.notion.so/28c2eda401c180ee939fefd75e0a5305`
- 본문 fetch: 성공
- 확인된 주요 섹션:
  - `01. 웹 소개`
  - `02. 웹의 기본 요소`
  - `03. 서버와 클라이언트 소통`
  - `04. 데이터베이스`
  - `05. API`
  - `06. 웹 개발 공부 방법`

## 공개 링크와 MCP page ID 차이

이전에 확인한 공개 Notion Site 링크는 아래와 같습니다.

```text
https://lightning-tree-8ec.notion.site/01-3731831f3e9080a0b9e1f8a3a6d2d15c
```

이 공개 링크의 page ID는 다음 값입니다.

```text
3731831f3e9080a0b9e1f8a3a6d2d15c
```

하지만 2026-06-02 기준 Notion MCP에서 이 ID를 직접 fetch하면 `NOT_FOUND`가 반환되었습니다. 따라서 MCP/API 작업에는 현재 접근이 확인된 워크스페이스 page ID인 `28c2eda4-01c1-80ee-939f-efd75e0a5305`를 사용합니다.

## 로컬 문서와의 관계

현재 이 과정과 연결되는 로컬 파일은 다음과 같습니다.

- 기준본: `courses/01.프로그래밍 시작하기/강의자료.md`
- Notion 업로드용 파생본: `courses/01.프로그래밍 시작하기/강의자료_notion.md`
- 원본 Notion export: `references/raw/notion/01.프로그래밍 시작하기/01 프로그래밍 시작하기 28c2eda401c180ee939fefd75e0a5305.md`

내용을 고칠 때는 `_notion.md`나 Notion 페이지를 먼저 고치지 않고, `courses/01.프로그래밍 시작하기/강의자료.md`를 먼저 수정합니다.

## 02. 웹 퍼블리싱 시작하기 접근 결과

2026-06-04에 Notion API publisher로 아래 내용을 확인했습니다.

- page ID: `3731831f-3e90-80ad-9117-e9d144b3e3bb`
- URL: `https://www.notion.so/02-3731831f3e9080ad9117e9d144b3e3bb`
- 로컬 기준본: `courses/02.웹 퍼블리싱 시작하기/강의자료.md`
- 업로드용 파생본: `courses/02.웹 퍼블리싱 시작하기/강의자료_notion.md`
- 업로드 방식: 기존 top-level block archive 후 전체 교체
- 업로드 결과:
  - archived: 65
  - topCreated: 77
  - verifiedTopLevel: 77
  - verifiedToggleHeading3: 72
  - image: 21
  - uploadedFiles: `완성된 코드.zip`, `thumbnails.zip`

## 이후 페이지 추가 규칙

새 과정 페이지를 Notion MCP로 확인하면 아래 형식으로 이 문서의 `확인된 페이지` 표에 추가합니다.

```text
| NN | NN.과정명 | `page-id` | `https://www.notion.so/...` | 검색 및 본문 fetch 확인 | `courses/NN.과정명/강의자료.md` |
```

확인하지 않은 page ID를 추정해서 기록하지 않습니다.
