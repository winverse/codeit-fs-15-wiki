import clsx from 'clsx';
import { buttonBase, buttonSizes, buttonVariants } from './Button.css.js';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  ...props
}) {
  const safeVariant = buttonVariants[variant] ?? buttonVariants.primary;
  const safeSize = buttonSizes[size] ?? buttonSizes.md;

  return (
    <button
      className={clsx(buttonBase, safeVariant, safeSize)}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
