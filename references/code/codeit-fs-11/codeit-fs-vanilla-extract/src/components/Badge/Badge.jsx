import { badge } from './Badge.css.js';

export default function Badge({
  children,
  color = 'primary',
  size = 'md',
  rounded = false,
  ...props
}) {
  return (
    <span className={badge({ color, size, rounded })} {...props}>
      {children}
    </span>
  );
}
