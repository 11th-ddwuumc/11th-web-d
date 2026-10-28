import { useState } from "react";
import { movies } from "../../data/movies";
import { MovieGrid } from "../../components/movies/movie-grid";
import { Pagination } from "../../components/movies/pagination";

export function MovieListPage() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-6 pt-8 pb-12">
      <h1 className="mb-6 text-[32px] font-bold">영화 목록</h1>
      <MovieGrid movies={movies} />
      <Pagination currentPage={currentPage} onPageChange={setCurrentPage} />
    </main>
  );
}
