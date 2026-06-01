import { useState } from "react";
import { AUTH_INITIAL_LOGIN_FORM } from "@/domains/auth/utils/constants";
import {
  createEmptyLoginErrors,
  validateLoginForm,
} from "@/domains/auth/utils/validation";

export default function useLoginForm({
  loginMutation,
  setFormError,
  setFormSuccess,
}) {
  const [loginForm, setLoginForm] = useState(() => ({
    ...AUTH_INITIAL_LOGIN_FORM,
  }));
  const [loginErrors, setLoginErrors] = useState(() =>
    createEmptyLoginErrors(),
  );

  const resetLoginFormState = () => {
    setLoginForm(() => ({ ...AUTH_INITIAL_LOGIN_FORM }));
    setLoginErrors(createEmptyLoginErrors());
  };

  const handleLoginInput = (event) => {
    const { name, value } = event.target;

    setFormError((prev) => (prev ? "" : prev));
    setLoginErrors((prev) => {
      if (!prev[name]) {
        return prev;
      }

      return {
        ...prev,
        [name]: "",
      };
    });

    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    setFormError("");
    setFormSuccess("");

    const { isValid, errors, payload } = validateLoginForm(loginForm);
    setLoginErrors(errors);

    if (!isValid) {
      return;
    }

    loginMutation.mutate(payload, {
      onSuccess: (loggedInUser) => {
        setFormSuccess(`로그인 완료: ${loggedInUser.email}`);
        setLoginErrors(createEmptyLoginErrors());
        setLoginForm((prev) => ({
          ...prev,
          password: "",
        }));
      },
      onError: (error) => {
        setFormError(
          error instanceof Error ? error.message : "요청이 실패했습니다.",
        );
      },
    });
  };

  return {
    loginForm,
    loginErrors,
    handleLoginInput,
    handleLoginSubmit,
    resetLoginFormState,
  };
}
