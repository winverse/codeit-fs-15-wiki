import type { ReactNode } from 'react';
import * as styles from './Badge.css';

interface BadgeProps {
  children: ReactNode;
}

export default function Badge({ children }: BadgeProps) {
  return <span className={styles.badge}>{children}</span>;
}
