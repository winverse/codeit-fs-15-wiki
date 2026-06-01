import type { ReactNode } from 'react';
import * as styles from './Panel.css';

interface PanelProps {
  title?: string;
  description?: string;
  children: ReactNode;
}

export default function Panel({ title, description, children }: PanelProps) {
  return (
    <section className={styles.panel}>
      {(title || description) && (
        <header className={styles.header}>
          {title ? <h2 className={styles.title}>{title}</h2> : null}
          {description ? (
            <p className={styles.description}>{description}</p>
          ) : null}
        </header>
      )}
      <div className={styles.content}>{children}</div>
    </section>
  );
}
