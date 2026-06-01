import styles from './Panel.module.css';

export function Panel({ children }) {
  return <section className={styles.panel}>{children}</section>;
}
