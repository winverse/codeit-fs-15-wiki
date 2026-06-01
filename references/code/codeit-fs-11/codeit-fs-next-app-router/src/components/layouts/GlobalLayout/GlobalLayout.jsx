import Link from 'next/link';
import * as styles from './GlobalLayout.css.js';
import Footer from '@/components/Footer';

export default function GlobalLayout({ children }) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/" className={styles.headerLink}>
          NEXT CINEMA
        </Link>
      </header>
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}
