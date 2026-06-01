'use client';

import Image from 'next/image';
import Link from 'next/link';
import * as styles from './MovieItem.css.js';

export default function MovieItem({
  id,
  title,
  overview,
  posterPath,
  releaseDate,
  voteAverage,
}) {
  const hasPoster = Boolean(posterPath);

  return (
    <Link href={`/movie/${id}`} className={styles.container}>
      {hasPoster ? (
        <Image
          src={posterPath}
          width={80}
          height={120}
          alt={title}
          className={styles.coverImg}
        />
      ) : (
        <div className={styles.coverPlaceholder} aria-label="포스터 없음" />
      )}
      <div className={styles.info}>
        <div className={styles.title}>{title}</div>
        {overview && (
          <div className={styles.subTitle}>{overview.slice(0, 100)}...</div>
        )}
        <div className={styles.author}>
          {releaseDate} | ⭐ {voteAverage.toFixed(1)}
        </div>
      </div>
    </Link>
  );
}
