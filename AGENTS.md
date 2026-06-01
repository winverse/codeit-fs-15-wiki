# codeit-fs-15 목차

이 저장소는 코드잇 풀스택 부트캠프 15기 강의 자료를 만들기 위한 작업 공간입니다.

## 01. docs

경로: [docs](./docs)

용도:

- 15기에서 실제로 사용할 강의 자료
- 커리큘럼 정리본
- 수업 문서
- 실습 가이드
- 퀴즈와 해설
- 문서 작성 규칙과 템플릿

작성 기준:

- [11기 자료 기반 15기 강의자료 제작 기준](./docs/00.%20문서%20운영/11기%20자료%20기반%2015기%20강의자료%20제작%20기준.md)을 먼저 확인합니다.
- 15기 강의 순서와 과정 제목은 `references/raw/notion`의 `NN.제목` 폴더명을 그대로 따릅니다.
- 내부 설명, 예제, 실습, 코드, 버전 안내만 15기 기준으로 개선합니다.
- 11기 참고 코드는 `references/code/codeit-fs-11/`에 둡니다. 원본은 `https://github.com/winverse/codeit-fs.git`의 `codeit-fs-11/`입니다.

## 02. references

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
- [code](./references/code): 이전 기수 참고 코드. 11기 코드는 `references/code/codeit-fs-11/`

## 정리 원칙

- 사용자는 정리 전 자료를 `references/raw`에 넣습니다.
- `references/raw`의 원본 파일은 가능한 한 수정하지 않습니다.
- Notion export zip은 `references/raw/notion/<페이지 제목>/` 아래에 해제합니다.
- `references/raw/notion`의 과정 폴더명은 `NN.제목` 형식으로 정리합니다. 예: `01.프로그래밍 시작하기`
- Notion export 안의 첨부 zip은 원본 zip 옆에 같은 이름의 폴더로 해제합니다.
- 해제 후 zip 파일은 `references/raw/zip` 아래로 모읍니다.
- PDF 원본이 별도로 필요하면 `references/raw/pdf` 아래에 둡니다.
- 제가 `references/raw`의 PDF와 Markdown을 읽고, 필요한 내용을 분류한 뒤 `docs`에 15기용 강의 자료로 정리합니다.
- 이전 기수 자료를 그대로 복사해 쓰기보다, 15기 기준으로 수정한 결과물을 `docs`에 작성합니다.
- 버전이나 정책이 바뀔 수 있는 내용은 최종 문서 작성 전에 다시 확인합니다.
