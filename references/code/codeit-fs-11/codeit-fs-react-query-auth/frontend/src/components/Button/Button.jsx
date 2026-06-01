import { clsx } from "clsx";
import * as styles from "./Button.css.js";

const DEFAULT_VARIANT = "primary";

export default function Button({
  variant = DEFAULT_VARIANT,
  className,
  children,
  ...props
}) {
  const resolvedVariantClass =
    styles.variant[variant] ?? styles.variant[DEFAULT_VARIANT];

  return (
    <button
      className={clsx(styles.base, resolvedVariantClass, className)}
      {...props}
    >
      {children}
    </button>
  );
}
