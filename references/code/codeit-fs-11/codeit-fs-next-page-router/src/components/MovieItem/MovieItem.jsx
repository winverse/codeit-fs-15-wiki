import Link from 'next/link';
import Image from 'next/image'; // ✅ 이미지 최적화를 위해 사용
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
      {/*
        ✅ Next.js의 Image 컴포넌트 사용
        - 자동으로 이미지를 최적화(WebP 변환, 사이즈 조절) 해줍니다.
        - width, height 값을 미리 지정해주어야 레이아웃 이동(CLS)이 방지됩니다.
        (자세한 내용은 나중에 '이미지 최적화' 챕터에서 다룹니다)
      */}
      {hasPoster ? (
        <Image
          src={posterPath}
          width={80}
          height={120}
          alt={title}
          className={styles.coverImg}
        />
      ) : (
        <div className={styles.coverPlaceholder}>이미지 없음</div>
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
