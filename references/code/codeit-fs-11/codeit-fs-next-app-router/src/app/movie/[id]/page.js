import MovieDetail from '@/components/MovieDetail';
import ReviewEditor from '@/components/ReviewEditor';

export default async function MoviePage({ params }) {
  const { id } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/movies/${id}`,
  );

  if (!response.ok) {
    return <div>영화 정보를 불러올 수 없습니다.</div>;
  }

  const movie = await response.json();

  return (
    <div>
      <MovieDetail {...movie} />
      <ReviewEditor movieId={Number(id)} />
    </div>
  );
}
