import Button from "@/components/Button";
import * as styles from "./AppError.css.js";

const FALLBACK_MESSAGE =
  "예상하지 못한 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.";

export default function AppError({ message, onRetry }) {
  return (
    <main className={styles.page}>
      <section className={styles.panel}>
        <h1 className={styles.title}>오류가 발생했습니다.</h1>
        <p className={styles.description}>
          요청을 처리하는 중 문제가 발생했습니다. 아래 버튼으로 현재
          라우트를 다시 시도할 수 있습니다.
        </p>

        <p className={styles.messageBox}>
          {message ?? FALLBACK_MESSAGE}
        </p>

        <div className={styles.buttonWrap}>
          <Button type="button" onClick={onRetry}>
            다시 시도
          </Button>
        </div>
      </section>
    </main>
  );
}
