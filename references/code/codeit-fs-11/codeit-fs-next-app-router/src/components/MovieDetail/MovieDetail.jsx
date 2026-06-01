import Image from 'next/image';
import * as styles from './MovieDetail.css.js';

export default function MovieDetail({
  title,
  tagline,
  overview,
  releaseDate,
  genres,
  runtime,
  posterPath,
  voteAverage,
}) {
  const hasPoster = Boolean(posterPath);
  const coverStyle = hasPoster
    ? { backgroundImage: `url('${posterPath}')` }
    : {};

  return (
    <div className={styles.container}>
      <div className={styles.coverImgContainer} style={coverStyle}>
        {hasPoster ? (
          <Image
            src={posterPath}
            width={240}
            height={350}
            alt={title}
            className={styles.coverImg}
          />
        ) : (
          <div className={styles.coverPlaceholder} aria-label="포스터 없음" />
        )}
      </div>

      <div className={styles.infoContainer}>
        <div className={styles.title}>{title}</div>
        <div>
          {releaseDate} | {genres.map((g) => g.name).join(', ')} | {runtime}분 |
          ⭐ {voteAverage.toFixed(1)}
        </div>
        <div className={styles.tagline}>{tagline}</div>
        <div className={styles.overview}>{overview}</div>
      </div>
    </div>
  );
}
