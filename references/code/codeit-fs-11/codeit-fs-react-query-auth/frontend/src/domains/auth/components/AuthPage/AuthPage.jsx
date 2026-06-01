"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getMe,
  getUsers,
  checkBackendHealth,
} from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";
import * as styles from "./AuthPage.css.js";
import Button from "@/components/Button";
import AuthHero from "@/domains/auth/components/AuthHero";
import AuthModeSwitch from "@/domains/auth/components/AuthModeSwitch";
import LoginForm from "@/domains/auth/components/LoginForm";
import SignUpForm from "@/domains/auth/components/SignUpForm";
import UserListSection from "@/domains/auth/components/UserListSection";
import useAuthPage from "@/domains/auth/hooks/useAuthPage";
import { AUTH_MODE } from "@/domains/auth/utils/constants";

export default function AuthPage() {
  const {
    mode,
    formError,
    formSuccess,
    createdEmail,
    signUpForm,
    loginForm,
    signUpErrors,
    loginErrors,
    signUpMutation,
    loginMutation,
    logoutMutation,
    handleModeChange,
    handleLogout,
    handleSignUpInput,
    handleLoginInput,
    handleSignUpSubmit,
    handleLoginSubmit,
  } = useAuthPage();

  const usersQuery = useQuery({
    queryKey: queryKeys.users.list(),
    queryFn: getUsers,
  });

  const healthQuery = useQuery({
    queryKey: queryKeys.backend.health(),
    queryFn: checkBackendHealth,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const meQuery = useQuery({
    queryKey: queryKeys.auth.me(),
    queryFn: getMe,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const isUserCreated = Boolean(
    createdEmail &&
    usersQuery.data?.some(
      (user) => user.email === createdEmail,
    ),
  );

  const apiStatusText = healthQuery.isLoading
    ? "백엔드 상태를 확인하는 중입니다."
    : healthQuery.isError
      ? "백엔드 연결 실패"
      : "백엔드 연결 정상";

  const authStatusText = meQuery.isLoading
    ? "로그인 상태 확인 중"
    : meQuery.data
      ? `${meQuery.data.email} 로그인됨`
      : "비로그인";

  const authFormContentByMode = {
    [AUTH_MODE.SIGN_UP]: (
      <SignUpForm
        form={signUpForm}
        errors={signUpErrors}
        onInput={handleSignUpInput}
        onSubmit={handleSignUpSubmit}
        isPending={signUpMutation.isPending}
      />
    ),
    [AUTH_MODE.LOGIN]: (
      <LoginForm
        form={loginForm}
        errors={loginErrors}
        onInput={handleLoginInput}
        onSubmit={handleLoginSubmit}
        isPending={loginMutation.isPending}
      />
    ),
  };

  const isAuthenticated = Boolean(meQuery.data);

  const loggedInContent = isAuthenticated ? (
    <div className={styles.authInfoBox}>
      <p className={styles.authInfoText}>
        현재 <strong>{meQuery.data.email}</strong>로
        로그인되어 있습니다.
      </p>
      <Button
        type="button"
        variant="ghost"
        disabled={logoutMutation.isPending}
        onClick={handleLogout}
      >
        {logoutMutation.isPending
          ? "처리 중..."
          : "로그아웃"}
      </Button>
    </div>
  ) : null;

  const authPanelContent = isAuthenticated
    ? loggedInContent
    : (authFormContentByMode[mode] ??
      authFormContentByMode[AUTH_MODE.LOGIN]);

  return (
    <main className={styles.page}>
      <div className={styles.backdropCircleOne} />
      <div className={styles.backdropCircleTwo} />

      <AuthHero
        mode={mode}
        apiStatusText={apiStatusText}
        isApiError={healthQuery.isError}
        authStatusText={authStatusText}
        isAuthError={meQuery.isError}
        isAuthenticated={isAuthenticated}
        createdEmail={createdEmail}
        isUserCreated={isUserCreated}
      />

      <section className={styles.panel}>
        {!isAuthenticated ? (
          <AuthModeSwitch
            mode={mode}
            onChange={handleModeChange}
          />
        ) : null}

        {formError ? (
          <p className={styles.formError}>{formError}</p>
        ) : formSuccess ? (
          <p className={styles.formSuccess}>
            {formSuccess}
          </p>
        ) : null}

        {authPanelContent}

        <UserListSection
          usersQuery={usersQuery}
          createdEmail={createdEmail}
        />
      </section>
    </main>
  );
}
