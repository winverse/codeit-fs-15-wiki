import { clsx } from "clsx";
import * as styles from "./AuthHero.css.js";
import { AUTH_MODE } from "@/domains/auth/utils/constants";
import { getReactQueryCode } from "@/domains/auth/utils/react-query-code";

export default function AuthHero({
  mode,
  apiStatusText,
  isApiError,
  authStatusText,
  isAuthError,
  isAuthenticated,
  createdEmail,
  isUserCreated,
}) {
  const reactQueryCode = getReactQueryCode(mode);

  const createdUserText = createdEmail
    ? isUserCreated
      ? `${createdEmail} 생성 확인 완료`
      : `${createdEmail} 확인 중`
    : "아직 생성된 사용자가 없습니다.";

  const secondaryCardTitle =
    mode === AUTH_MODE.LOGIN ? "로그인 상태" : "생성 확인";

  const secondaryCardText =
    mode === AUTH_MODE.LOGIN
      ? authStatusText
      : createdUserText;

  const secondaryCardTone =
    mode === AUTH_MODE.LOGIN
      ? isAuthenticated
        ? styles.statusSuccess
        : styles.statusIdle
      : isUserCreated
        ? styles.statusSuccess
        : styles.statusIdle;

  return (
    <section className={styles.hero}>
      <p className={styles.kicker}>23. React Query Auth</p>

      <div className={styles.codePanel}>
        <p className={styles.codeTitle}>
          현재 모드에서 사용하는 훅
        </p>
        <pre className={styles.codeBlock}>
          <code>{reactQueryCode}</code>
        </pre>
      </div>

      <div className={styles.statusGrid}>
        <article className={styles.statusCard}>
          <h2 className={styles.statusCardTitle}>
            API 상태
          </h2>
          <p
            className={clsx(
              styles.statusText,
              isApiError && styles.statusError,
            )}
          >
            {apiStatusText}
          </p>
        </article>
        <article className={styles.statusCard}>
          <h2 className={styles.statusCardTitle}>
            {secondaryCardTitle}
          </h2>
          <p
            className={clsx(
              styles.statusText,
              secondaryCardTone,
              isAuthError && styles.statusError,
            )}
          >
            {secondaryCardText}
          </p>
        </article>
      </div>
    </section>
  );
}
