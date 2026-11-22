import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getMovies } from "../../api/movies/get-movies";
import { MovieGrid } from "../../components/movies/movie-grid";
import { Pagination } from "../../components/movies/pagination";

export function MovieListPage() {
  const [page, setPage] = useState(1);

  const moviesQuery = useQuery({
    queryKey: ["movies", "list", { page }],
    queryFn: () => getMovies({ page }),
  });

  const movies = moviesQuery.data?.results ?? [];

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
  };

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-6 pt-8 pb-12">
      <h1 className="mb-6 text-[32px] font-bold">영화 목록</h1>
      {moviesQuery.isPending ? (
        <p className="text-sm text-gray-500">영화 목록을 불러오는 중이에요.</p>
      ) : moviesQuery.isError ? (
        <p className="text-sm text-red-600">영화 목록을 불러오지 못했어요.</p>
      ) : movies.length === 0 ? (
        <p className="text-sm text-gray-500">조건에 맞는 영화가 없어요.</p>
      ) : (
        <MovieGrid movies={movies} />
      )}
      <Pagination currentPage={page} onPageChange={handlePageChange} />
    </main>
  );
}
