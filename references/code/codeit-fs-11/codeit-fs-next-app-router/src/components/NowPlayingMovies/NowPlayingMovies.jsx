import MovieList from '@/components/MovieList';
import * as styles from './NowPlayingMovies.css.js';

export default function NowPlayingMovies() {
  const moviesPromise = fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/movies/now-playing`,
    { next: { revalidate: 2 } }, // 추가: 3초마다 갱신
  ).then((res) => res.json());

  return (
    <MovieList
      moviesPromise={moviesPromise}
      limit={3}
      className={styles.container}
    />
  );
}
