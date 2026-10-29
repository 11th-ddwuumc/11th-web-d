import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";
import { movies } from "../../data/movies";

export function MovieListPage() {
  return (
    <main className="mx-auto max-w-[1280px] px-4 py-6 sm:px-8 lg:px-20">
      <h2 className="mb-5 font-['Pretendard',sans-serif] text-[20px] font-extrabold">
        영화 목록
      </h2>

      <MovieGrid movies={movies} />
      <Pagination />
    </main>
  );
}