import { clsx } from "clsx";
import * as styles from "./TextField.css.js";

export default function TextField({
  id,
  label,
  errorMessage,
  className,
  labelClassName,
  inputClassName,
  errorClassName,
  ...props
}) {
  return (
    <div className={clsx(styles.field, className)}>
      {label ? (
        <label className={clsx(styles.label, labelClassName)} htmlFor={id}>
          {label}
        </label>
      ) : null}
      <input
        className={clsx(
          styles.input,
          errorMessage && styles.inputInvalid,
          inputClassName,
        )}
        id={id}
        {...props}
      />
      {errorMessage ? (
        <p className={clsx(styles.errorText, errorClassName)}>{errorMessage}</p>
      ) : null}
    </div>
  );
}
