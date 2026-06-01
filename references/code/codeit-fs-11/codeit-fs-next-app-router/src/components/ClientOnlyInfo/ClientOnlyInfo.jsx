'use client';
import * as styles from './ClientOnlyInfo.css.js';

export default function ClientOnlyInfo() {
  const href = typeof window === 'undefined' ? '' : window.location.href;

  return <div className={styles.container}>현재 주소: {href}</div>;
}
