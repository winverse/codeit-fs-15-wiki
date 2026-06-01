import MovieItemSkeleton from '@/components/MovieItemSkeleton';
import * as styles from './MovieListSkeleton.css.js';

export default function MovieListSkeleton({ count }) {
  return (
    <div className={styles.container}>
      {Array(count)
        .fill(0)
        .map((_, idx) => (
          <MovieItemSkeleton key={`movie-skeleton-${idx}`} />
        ))}
    </div>
  );
}
