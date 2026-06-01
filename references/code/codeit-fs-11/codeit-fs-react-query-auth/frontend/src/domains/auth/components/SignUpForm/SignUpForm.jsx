"use client";

import TextField from "@/components/TextField";
import Button from "@/components/Button";
import * as styles from "./SignUpForm.css.js";

export default function SignUpForm({
  form,
  errors,
  onInput,
  onSubmit,
  isPending,
}) {
  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate={true}>
      <TextField
        id="signup-name"
        label="이름"
        name="name"
        type="text"
        minLength={2}
        required={true}
        value={form.name}
        onChange={onInput}
        placeholder="2자 이상 입력"
        autoComplete="name"
        errorMessage={errors?.name}
      />

      <TextField
        id="signup-email"
        label="이메일"
        name="email"
        type="email"
        required={true}
        value={form.email}
        onChange={onInput}
        placeholder="you@example.com"
        autoComplete="email"
        errorMessage={errors?.email}
      />

      <TextField
        id="signup-password"
        label="비밀번호"
        name="password"
        type="password"
        minLength={6}
        required={true}
        value={form.password}
        onChange={onInput}
        placeholder="6자 이상 입력"
        autoComplete="new-password"
        errorMessage={errors?.password}
      />

      <Button type="submit" disabled={isPending}>
        {isPending ? "요청 처리 중..." : "회원가입"}
      </Button>
    </form>
  );
}
