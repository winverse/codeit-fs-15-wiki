import * as styles from '@/styles/home.css.js';
import SearchLayout from '@/components/layouts/SearchLayout';
import MovieItem from '@/components/MovieItem';
import { useEffect } from 'react';
import { fetchMovies, fetchNowPlayingMovies } from '@/lib/movie.server';
import Head from 'next/head';

// 3️⃣ Props로 서버 데이터를 받음 (movies, data)
export default function Home({ nowPlaying, allMovies, data }) {
  // 4️⃣ Client Side에서만 실행 (Browser)
  useEffect(() => {
    // window, document 등은 여기서 안전하게 사용 가능
    console.log('Client Side Execution:', window.location.href);
  }, []);

  // 2️⃣, 5️⃣ Server & Client 모두 실행 (Hydration)
  console.log('Server & Client Execution:', data);

  return (
    <>
      <Head>
        <title>Next Cinema | 검색</title>
        <meta name="description" content="영화 검색 결과 페이지" />
      </Head>
      <main className={styles.container}>
        <section>
          <h3>지금 상영중인 영화</h3>
          <div className={styles.list}>
            {nowPlaying.map((movie) => (
              <MovieItem key={`rec-${movie.id}`} {...movie} />
            ))}
          </div>
        </section>

        <section>
          <h3>등록된 모든 영화</h3>
          <div className={styles.list}>
            {allMovies.map((movie) => (
              <MovieItem key={`all-${movie.id}`} {...movie} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

Home.getLayout = (page) => {
  return <SearchLayout>{page}</SearchLayout>;
};

export const getStaticProps = async () => {
  try {
    console.log('Build Time Execution: Home Page Created'); // 빌드 타임 확인용 로그
    const [nowPlaying, allMovies] = await Promise.all([
      fetchNowPlayingMovies(),
      fetchMovies(),
    ]);

    const nowPlayingIds = nowPlaying.map((movie) => movie.id);
    const filteredMovies = allMovies.filter(
      (movie) => !nowPlayingIds.includes(movie.id),
    );
    const data = 'Next Cinema SSR Mode';

    return {
      props: {
        nowPlaying: nowPlaying.slice(0, 6),
        allMovies: filteredMovies,
        data,
      },
      // revalidate: 3,
    };
  } catch (error) {
    console.error('API Fetch Error:', error);
    return {
      props: {
        nowPlaying: [],
        allMovies: [],
        error: 'BACKEND_UNAVAILABLE',
      },
    };
  }
};
