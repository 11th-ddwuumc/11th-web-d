import { useState } from "react";
import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";
import { movies as initialMovies } from "../../data/movies";

export function MovieListPage() {
  const [movies, setMovies] = useState(initialMovies);

  function handleToggleBookmark(movieId: number) {
    setMovies((currentMovies) =>
      currentMovies.map((movie) =>
        movie.id === movieId
          ? { ...movie, isBookmarked: !movie.isBookmarked }
          : movie,
      ),
    );
  }

  return (
    <main className="mx-auto max-w-[1280px] px-4 py-6 sm:px-8 lg:px-20">
      <h2 className="mb-5 font-['Pretendard',sans-serif] text-[20px] font-extrabold">
        영화 목록
      </h2>

      <MovieGrid
        movies={movies}
        onToggleBookmark={handleToggleBookmark}
      />
      <Pagination />
    </main>
  );
}
