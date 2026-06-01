"use client";

import TextField from "@/components/TextField";
import Button from "@/components/Button";
import * as styles from "./LoginForm.css.js";

export default function LoginForm({
  form,
  errors,
  onInput,
  onSubmit,
  isPending,
}) {
  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate={true}>
      <TextField
        id="login-email"
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
        id="login-password"
        label="비밀번호"
        name="password"
        type="password"
        minLength={6}
        required={true}
        value={form.password}
        onChange={onInput}
        placeholder="6자 이상 입력"
        autoComplete="current-password"
        errorMessage={errors?.password}
      />

      <Button type="submit" disabled={isPending}>
        {isPending ? "요청 처리 중..." : "로그인"}
      </Button>
    </form>
  );
}
