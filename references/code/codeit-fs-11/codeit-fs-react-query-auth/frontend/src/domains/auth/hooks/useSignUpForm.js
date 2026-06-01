import { useState } from "react";
import { AUTH_INITIAL_SIGN_UP_FORM } from "@/domains/auth/utils/constants";
import {
  createEmptySignUpErrors,
  validateSignUpForm,
} from "@/domains/auth/utils/validation";

export default function useSignUpForm({
  signUpMutation,
  setFormError,
  setFormSuccess,
  setCreatedEmail,
}) {
  const [signUpForm, setSignUpForm] = useState(() => ({
    ...AUTH_INITIAL_SIGN_UP_FORM,
  }));
  const [signUpErrors, setSignUpErrors] = useState(() =>
    createEmptySignUpErrors(),
  );

  const resetSignUpFormState = () => {
    setSignUpForm(() => ({ ...AUTH_INITIAL_SIGN_UP_FORM }));
    setSignUpErrors(createEmptySignUpErrors());
  };

  const handleSignUpInput = (event) => {
    const { name, value } = event.target;

    setFormError((prev) => (prev ? "" : prev));
    setSignUpErrors((prev) => {
      if (!prev[name]) {
        return prev;
      }

      return {
        ...prev,
        [name]: "",
      };
    });

    setSignUpForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUpSubmit = (event) => {
    event.preventDefault();
    setFormError("");
    setFormSuccess("");

    const { isValid, errors, payload } = validateSignUpForm(signUpForm);
    setSignUpErrors(errors);

    if (!isValid) {
      return;
    }

    signUpMutation.mutate(payload, {
      onSuccess: (createdUser) => {
        setCreatedEmail(createdUser.email);
        setFormSuccess(`회원가입 완료: ${createdUser.email}`);
        resetSignUpFormState();
      },
      onError: (error) => {
        const message =
          error instanceof Error ? error.message : "요청이 실패했습니다.";

        if (
          error?.code === "EMAIL_ALREADY_EXISTS" ||
          error?.field === "email"
        ) {
          setSignUpErrors((prev) => ({
            ...prev,
            email: message,
          }));
          return;
        }

        setFormError(message);
      },
    });
  };

  return {
    signUpForm,
    signUpErrors,
    handleSignUpInput,
    handleSignUpSubmit,
    resetSignUpFormState,
  };
}
