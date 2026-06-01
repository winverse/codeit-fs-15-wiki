import { Suspense } from 'react';
import MovieItem from '@/components/MovieItem';
import MovieListSkeleton from '@/components/MovieListSkeleton';
import * as styles from '@/styles/search.css.js';

async function SearchResult({ keyword }) {
  if (!keyword) return <div>검색어를 입력하세요.</div>;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/movies/search?q=${encodeURIComponent(
      keyword,
    )}`,
  );
  if (!response.ok) return <div>검색 과정에서 오류가 발생했습니다.</div>;

  const { movies } = await response.json();

  return (
    <div>
      {movies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}

export default async function SearchPage({ searchParams }) {
  const { q = '' } = await searchParams;
  const keyword = typeof q === 'string' ? q : '';
  const trimmed = keyword.trim();

  return (
    <div className={styles.container}>
      <Suspense key={trimmed} fallback={<MovieListSkeleton count={3} />}>
        <SearchResult keyword={trimmed} />
      </Suspense>
    </div>
  );
}
