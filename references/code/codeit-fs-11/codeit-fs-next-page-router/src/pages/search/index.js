import { useRouter } from 'next/router';
import SearchLayout from '@/components/layouts/SearchLayout';
import MovieItem from '@/components/MovieItem';
import { fetchSearchMovies } from '@/lib/movie.client'; // ✅ 클라이언트 전용 Helper 사용
import { useEffect, useState } from 'react';

export default function Search() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { q } = router.query;

  useEffect(() => {
    if (!router.isReady || !q) return;
    const controller = new AbortController();

    setIsLoading(true);
    const fetchSearchResults = async () => {
      try {
        const movieData = await fetchSearchMovies(q, controller.signal);
        setMovies(movieData);
      } catch (error) {
        if (error.name === 'AbortError') return;
        console.error(error);
      } finally {
        // 3️⃣ 유효한(취소되지 않은) 요청인 경우에만 로딩 종료
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchSearchResults();

    return () => {
      controller.abort();
    };
  }, [router.isReady, q]);

  return (
    <div>
      {/* 4️⃣ 로딩 상태 표시 (UX) */}
      {isLoading ? (
        <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>
      ) : (
        movies.map((movie) => <MovieItem key={movie.id} {...movie} />)
      )}

      {/* 검색 결과가 없을 때의 UI */}
      {!isLoading && movies.length === 0 && q && (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          검색 결과가 없습니다.
        </div>
      )}
    </div>
  );
}
Search.getLayout = (page) => {
  return <SearchLayout>{page}</SearchLayout>;
};
