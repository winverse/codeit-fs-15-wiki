import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { clsx } from 'clsx';
import * as styles from './TextField.css';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  message?: string;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField({ label, message, className, id, ...props }, ref) {
    const inputId = id ?? props.name;

    return (
      <label className={styles.field} htmlFor={inputId}>
        <span className={styles.label}>{label}</span>
        <input
          ref={ref}
          id={inputId}
          className={clsx(styles.input, className)}
          {...props}
        />
        {message ? <span className={styles.message}>{message}</span> : null}
      </label>
    );
  },
);

export default TextField;
