import { Suspense } from 'react';
import MovieListSkeleton from '@/components/MovieListSkeleton';
import NowPlayingMovies from '@/components/NowPlayingMovies';
import PopularMovies from '@/components/PopularMovies';
import * as styles from '@/styles/home.css.js';

export default function Home() {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h3>지금 상영중인 영화</h3>
        <Suspense fallback={<MovieListSkeleton count={3} />}>
          <NowPlayingMovies />
        </Suspense>
      </section>
      <section className={styles.section}>
        <h3>인기 영화</h3>
        <Suspense fallback={<MovieListSkeleton count={10} />}>
          <PopularMovies />
        </Suspense>
      </section>
    </div>
  );
}
