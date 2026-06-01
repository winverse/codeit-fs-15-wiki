import { clsx } from "clsx";
import { motion } from "framer-motion";
import * as styles from "./AuthModeSwitch.css.js";
import { AUTH_MODE } from "@/domains/auth/utils/constants";

export default function AuthModeSwitch({ mode, onChange }) {
  return (
    <div className={styles.modeSwitch}>
      <motion.span
        className={styles.modePill}
        initial={false}
        animate={{ x: mode === AUTH_MODE.SIGN_UP ? "0%" : "100%" }}
        transition={{ type: "tween", duration: 0.18, ease: [0.2, 0, 0.2, 1] }}
      />
      <button
        type="button"
        className={clsx(
          styles.modeButton,
          mode === AUTH_MODE.SIGN_UP && styles.modeButtonActive,
        )}
        onClick={() => onChange(AUTH_MODE.SIGN_UP)}
      >
        <span className={styles.modeButtonLabel}>회원가입</span>
      </button>
      <button
        type="button"
        className={clsx(
          styles.modeButton,
          mode === AUTH_MODE.LOGIN && styles.modeButtonActive,
        )}
        onClick={() => onChange(AUTH_MODE.LOGIN)}
      >
        <span className={styles.modeButtonLabel}>로그인</span>
      </button>
    </div>
  );
}
