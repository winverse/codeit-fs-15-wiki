import MovieList from '@/components/MovieList';
import * as styles from './PopularMovies.css.js';

export default function PopularMovies() {
  const moviesPromise = fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/movies`, {
    cache: 'force-cache',
  }).then((res) => res.json());

  return (
    <MovieList moviesPromise={moviesPromise} className={styles.container} />
  );
}
