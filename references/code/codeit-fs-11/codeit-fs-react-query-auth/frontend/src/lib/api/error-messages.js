export const DEFAULT_ERROR_MESSAGE =
  "요청을 처리하지 못했습니다. 잠시 후 다시 시도해 주세요.";

const ERROR_MESSAGE_OVERRIDES = {
  "Invalid email or password":
    "이메일 또는 비밀번호가 올바르지 않습니다.",
  "No authentication token provided":
    "인증 토큰이 없습니다.",
  "Invalid or expired token":
    "토큰이 유효하지 않거나 만료되었습니다.",
  "User not found from token":
    "토큰에 해당하는 사용자를 찾을 수 없습니다.",
};

export function normalizeErrorMessage(message) {
  return ERROR_MESSAGE_OVERRIDES[message] ?? message;
}
