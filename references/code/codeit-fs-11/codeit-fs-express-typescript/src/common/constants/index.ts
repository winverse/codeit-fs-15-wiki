export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  CONFLICT: 409,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const ERROR_MESSAGE = {
  VALIDATION_FAILED: '입력값 검증에 실패했습니다.',
  RESOURCE_NOT_FOUND: '리소스를 찾을 수 없습니다.',
  USER_EMAIL_ALREADY_EXISTS: '이미 사용 중인 이메일입니다.',
  INTERNAL_SERVER_ERROR: '서버 내부 오류가 발생했습니다.',
} as const;
