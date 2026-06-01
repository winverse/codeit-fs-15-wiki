'use client';

import { use } from 'react';
import MovieItem from '@/components/MovieItem';

export default function MovieList({ moviesPromise, limit, className }) {
  const { movies } = use(moviesPromise);
  const list = typeof limit === 'number' ? movies.slice(0, limit) : movies;

  return (
    <div className={className}>
      {list.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}
