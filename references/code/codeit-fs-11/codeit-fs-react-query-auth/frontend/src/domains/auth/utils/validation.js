export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function createEmptySignUpErrors() {
  return {
    name: "",
    email: "",
    password: "",
  };
}

export function createEmptyLoginErrors() {
  return {
    email: "",
    password: "",
  };
}

export function validateSignUpForm(form) {
  const errors = createEmptySignUpErrors();
  const nextName = form.name.trim();
  const nextEmail = form.email.trim();
  const nextPassword = form.password;

  if (!nextName) {
    errors.name = "이름을 입력해 주세요.";
  } else if (nextName.length < 2) {
    errors.name = "이름은 2자 이상이어야 합니다.";
  }

  if (!nextEmail) {
    errors.email = "이메일을 입력해 주세요.";
  } else if (!isValidEmail(nextEmail)) {
    errors.email = "유효한 이메일 형식이 아닙니다.";
  }

  if (!nextPassword) {
    errors.password = "비밀번호는 필수입니다.";
  } else if (nextPassword.length < 6) {
    errors.password = "비밀번호는 6자 이상이어야 합니다.";
  }

  const isValid = !Object.values(errors).some(Boolean);

  if (!isValid) {
    return { isValid, errors, payload: null };
  }

  return {
    isValid,
    errors,
    payload: {
      email: nextEmail,
      password: nextPassword,
      name: nextName,
    },
  };
}

export function validateLoginForm(form) {
  const errors = createEmptyLoginErrors();
  const nextEmail = form.email.trim();
  const nextPassword = form.password;

  if (!nextEmail) {
    errors.email = "이메일을 입력해 주세요.";
  } else if (!isValidEmail(nextEmail)) {
    errors.email = "유효한 이메일 형식이 아닙니다.";
  }

  if (!nextPassword) {
    errors.password = "비밀번호를 입력해 주세요.";
  }

  const isValid = !Object.values(errors).some(Boolean);

  if (!isValid) {
    return { isValid, errors, payload: null };
  }

  return {
    isValid,
    errors,
    payload: {
      email: nextEmail,
      password: nextPassword,
    },
  };
}
