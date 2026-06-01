import type { ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';
import * as styles from './Button.css';

type ButtonVariant = keyof typeof styles.variant;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const DEFAULT_VARIANT: ButtonVariant = 'primary';

export default function Button({
  variant = DEFAULT_VARIANT,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(styles.base, styles.variant[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
