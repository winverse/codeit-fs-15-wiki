'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import * as styles from './SearchLayout.css.js';

function SearchBar({ children }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState('');

  const q = searchParams.get('q') || '';

  useEffect(() => {
    setSearch(q);
  }, [q]);

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    const next = search.trim();
    if (!next || q === next) return;

    router.push(`/search?q=${encodeURIComponent(next)}`);
  };

  const onKeyDown = (e) => {
    if (e.key !== 'Enter') return;
    onSubmit();
  };

  return (
    <div>
      <div className={styles.container}>
        <input
          className={styles.input}
          value={search}
          onChange={onChangeSearch}
          onKeyDown={onKeyDown}
          placeholder="검색어를 입력하세요..."
        />
        <button className={styles.button} onClick={onSubmit}>
          검색
        </button>
      </div>
      {children}
    </div>
  );
}

export default function SearchLayout({ children }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchBar>{children}</SearchBar>
    </Suspense>
  );
}
