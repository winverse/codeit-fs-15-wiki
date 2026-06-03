# codeit-fs-15 목차

이 저장소는 코드잇 풀스택 부트캠프 15기 강의 자료를 만들기 위한 작업 공간입니다.

## 01. docs

경로: [docs](./docs)

용도:

- 이 레포의 운영 문서
- 강의자료 제작 기준
- 커리큘럼 진행 상태 기록
- 참고자료 정리 원칙
- Notion 변환 원칙

작성 기준:

- [15기 강의자료 개선 기준](./docs/00.%20문서%20운영/15기%20강의자료%20개선%20기준.md)을 먼저 확인합니다.
- [01 기준 샘플](./docs/00.%20문서%20운영/01%20기준%20샘플.md)은 Notion 동기화, formatter 생성, 품질 점검의 기준 예시로 사용합니다.
- `docs`에는 실제 강의자료 본문을 두지 않습니다.
- `docs`에는 이 레포의 구조, 작성 기준, 진행 상태, 운영 기록만 둡니다.

## 02. courses

경로: [courses](./courses)

용도:

- 15기에서 실제로 사용할 강의 자료
- 과정별 수업 문서
- 실습 가이드
- 퀴즈와 해설

작성 기준:

- 15기 강의 순서와 과정 제목은 `references/raw/notion`의 `NN.제목` 폴더명을 그대로 따릅니다.
- 내부 내용은 퀴즈, 문장, 코드와 실습 중심으로 개선합니다.
- `#스크립트`는 학생용 읽기 자료가 아니라 강사용 수업 진행 대본입니다. 학생을 위한 보강은 `#실습`, `#퀴즈`, 링크 안내, 완료 기준처럼 학생이 보는 영역에 반영합니다.
- `#스크립트`를 제외한 본문, 퀴즈, 실습 안내, 꿀팁은 교과서형 문체로 작성합니다. `해볼게요`, `보시면`, `하겠습니다` 같은 말하기 표현은 강사용 대본에만 둡니다.
- 코드잇 실습 페이지의 내부 문제를 직접 확인하지 못한 경우, 파일명이나 주변 코드만 보고 목표, 진행 단계, 성공 확인을 추정해 쓰지 않습니다.
- 퀴즈 섹션이 단순 링크만 담고 있으면 원문을 유지합니다. 문제은행을 추가하려면 링크 내용을 먼저 확인한 뒤 근거가 있는 문항만 작성합니다.
- 실습 코드는 `references/code/*`를 기준으로 확인합니다. 11기 참고 코드는 `references/code/codeit-fs-11/`에 둡니다.
- 과정별 문서는 `courses/NN.제목/강의자료.md`처럼 과정 폴더 바로 아래에 둡니다. 별도 `v1`, `v2` 폴더는 만들지 않고 변경 이력은 Git 커밋과 필요 시 운영 문서로 관리합니다.
- Notion 업로드용 Markdown은 원본 문서 작성이 끝난 뒤에만 만듭니다.
- Notion 변환이 필요하면 로컬 스킬 `$notion-formatter`를 사용합니다. 원본 `courses` 문서를 source of truth로 두고, `_notion.md`는 업로드용 파생본으로만 취급합니다.

## 03. references

경로: [references](./references)

용도:

- 15기 강의 자료를 만들기 위해 참고할 원본 자료
- 이전 기수, 특히 11기에서 사용한 PDF와 Markdown 자료
- 기존 강의 자료와 임시 메모
- 원본 자료를 바탕으로 15기용 문서를 만들기 위한 기준 자료

하위 구성:

- [raw](./references/raw): 사용자가 넣어주는 원본 zip, PDF, Markdown 자료
- [raw/notion](./references/raw/notion): Notion export zip을 해제한 자료
- [raw/zip](./references/raw/zip): 원본 zip과 첨부 zip을 모아둔 보관 폴더
- `raw/pdf`: 별도 PDF 원본이 생기면 추가할 위치
- [code](./references/code): 이전 기수 코드와 사용자가 추가한 실습 코드. 11기 코드는 `references/code/codeit-fs-11/`

## 정리 원칙

- 사용자는 정리 전 자료를 `references/raw`에 넣습니다.
- `references/raw`의 원본 파일은 가능한 한 수정하지 않습니다.
- Notion export zip은 `references/raw/notion/<페이지 제목>/` 아래에 해제합니다.
- `references/raw/notion`의 과정 폴더명은 `NN.제목` 형식으로 정리합니다. 예: `01.프로그래밍 시작하기`
- Notion export 안의 첨부 zip은 원본 zip 옆에 같은 이름의 폴더로 해제합니다.
- 해제 후 zip 파일은 `references/raw/zip` 아래로 모읍니다.
- PDF 원본이 별도로 필요하면 `references/raw/pdf` 아래에 둡니다.
- 제가 `references/raw`의 PDF와 Markdown, `references/code/*`의 실습 코드를 읽고 15기용 강의 자료로 정리합니다.
- 이전 기수 자료를 그대로 복사해 쓰기보다, 퀴즈, 문장, 코드와 실습을 15기 기준으로 개선한 결과물을 `courses`에 작성합니다.
- Notion 업로드가 필요해지면 `courses` 원본을 먼저 확정한 뒤 `$notion-formatter`로 `_notion.md`를 생성합니다.
- 버전이나 정책이 바뀔 수 있는 내용은 최종 문서 작성 전에 다시 확인합니다.
