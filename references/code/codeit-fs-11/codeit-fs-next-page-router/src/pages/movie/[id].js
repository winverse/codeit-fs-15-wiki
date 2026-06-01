import MovieDetail from '@/components/MovieDetail';
import { fetchMovies, fetchOneMovie } from '@/lib/movie.server';
import { useRouter } from 'next/router';

export default function Page({ movie }) {
  const router = useRouter();
  if (router.isFallback) {
    return <div className="container">Loading...</div>;
  }

  if (!movie)
    return <div className="container">영화 정보를 불러오는 중...</div>;

  return (
    <div className="container">
      <MovieDetail {...movie} />
    </div>
  );
}

export const getStaticPaths = async () => {
  const movies = await fetchMovies();

  const paths = movies.slice(0, 10).map((movie) => ({
    params: { id: movie.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const { id: movieId } = context.params; // getStaticPaths에서 전달된 params

  try {
    const movie = await fetchOneMovie(Number(movieId));

    if (!movie) {
      return { notFound: true };
    }

    return {
      props: { movie },
      revalidate: 60,
    };
  } catch {
    return { notFound: true };
  }
};
