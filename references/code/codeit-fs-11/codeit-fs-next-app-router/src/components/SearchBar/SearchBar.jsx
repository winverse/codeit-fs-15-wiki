'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as styles from './SearchBar.css.js';

export default function SearchBar() {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    const next = search.trim();
    if (!next) return;
    router.push(`/search?q=${encodeURIComponent(next)}`);
  };

  return (
    <div className={styles.container}>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="검색어를 입력하세요..."
        className={styles.input}
      />
      <button className={styles.button} onClick={handleSearch}>
        검색
      </button>
    </div>
  );
}
