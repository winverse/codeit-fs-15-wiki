// Prisma 에러 코드 상수
export const PRISMA_ERROR = {
  UNIQUE_CONSTRAINT: 'P2002',
  RECORD_NOT_FOUND: 'P2025',
};

// 에러 메시지 상수
export const ERROR_MESSAGE = {
  // User 관련
  USER_NOT_FOUND: '사용자를 찾을 수 없습니다.',
  EMAIL_REQUIRED: '이메일은 필수입니다.',
  EMAIL_ALREADY_EXISTS: '이미 사용 중인 이메일입니다.',
  FAILED_TO_FETCH_USERS: '사용자 목록을 조회하지 못했습니다.',
  FAILED_TO_FETCH_USER: '사용자 정보를 조회하지 못했습니다.',
  FAILED_TO_CREATE_USER: '사용자를 생성하지 못했습니다.',
  FAILED_TO_UPDATE_USER: '사용자 정보를 수정하지 못했습니다.',
  FAILED_TO_DELETE_USER: '사용자를 삭제하지 못했습니다.',

  // Post 관련
  POST_NOT_FOUND: '게시글을 찾을 수 없습니다.',
  TITLE_REQUIRED: '제목은 필수입니다.',
  AUTHOR_ID_REQUIRED: '작성자 ID는 필수입니다.',
  SEARCH_QUERY_REQUIRED: '검색어는 필수입니다.',
  FAILED_TO_FETCH_POSTS: '게시글 목록을 조회하지 못했습니다.',
  FAILED_TO_FETCH_POST: '게시글을 조회하지 못했습니다.',
  FAILED_TO_CREATE_POST: '게시글을 생성하지 못했습니다.',
  FAILED_TO_UPDATE_POST: '게시글을 수정하지 못했습니다.',
  FAILED_TO_DELETE_POST: '게시글을 삭제하지 못했습니다.',
  FAILED_TO_SEARCH_POSTS: '게시글을 검색하지 못했습니다.',
  FAILED_TO_FETCH_PUBLISHED_POSTS: '공개 게시글을 조회하지 못했습니다.',
  FAILED_TO_FETCH_USER_WITH_POSTS: '사용자와 게시글을 함께 조회하지 못했습니다.',
  FAILED_TO_DELETE_POST_WITH_COMMENTS: '게시글과 댓글을 삭제하지 못했습니다.',
  FAILED_TO_CREATE_POST_WITH_COMMENT: '게시글과 댓글을 함께 생성하지 못했습니다.',
  FAILED_TO_CREATE_MULTIPLE_POSTS: '여러 게시글을 생성하지 못했습니다.',
  POSTS_ARRAY_REQUIRED: '게시글 배열은 필수입니다.',
  INVALID_POSTS_ARRAY: '게시글 목록은 배열이어야 합니다.',

  // Auth 관련
  NO_AUTH_TOKEN: '인증 토큰이 없습니다.',
  INVALID_TOKEN: '토큰이 유효하지 않거나 만료되었습니다.',
  USER_NOT_FOUND_FROM_TOKEN: '토큰에 해당하는 사용자를 찾을 수 없습니다.',
  AUTH_FAILED: '인증에 실패했습니다.',
  INVALID_CREDENTIALS: '이메일 또는 비밀번호가 올바르지 않습니다.',

  // Validation
  INVALID_INPUT: '요청 값이 올바르지 않습니다.',
  VALIDATION_FAILED: '입력값 검증에 실패했습니다.',

  // 권한/인증 (Exception 기본값으로 사용)
  UNAUTHORIZED: '인증이 필요합니다.',
  FORBIDDEN: '접근 권한이 없습니다.',
  FORBIDDEN_RESOURCE: '해당 리소스에 대한 권한이 없습니다.',

  // 일반 에러 (Exception 기본값으로 사용)
  RESOURCE_NOT_FOUND: '리소스를 찾을 수 없습니다.',
  BAD_REQUEST: '잘못된 요청입니다.',
  RESOURCE_CONFLICT: '이미 존재하는 데이터입니다.',
  INTERNAL_SERVER_ERROR: '서버 내부 오류가 발생했습니다.',
};
