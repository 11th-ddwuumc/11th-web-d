import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";

import { useState, useEffect } from "react";
import { getMovies } from "../../api/movies/get-movies";
import type { TmdbMovieListItem } from "../../api/movies/models";

export function MovieListPage() {
  const [movies, setMovies] = useState<TmdbMovieListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    async function loadMovies() {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const response = await getMovies({ page: 1 });
        if (!ignore) setMovies(response.results);
      } catch {
        if (!ignore) setErrorMessage("영화 목록을 불러오지 못했어요.");
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    loadMovies();

    return () => {
      ignore = true;
    };
  }, []);

   return (
    <main className="mx-auto max-w-[1280px] px-4 py-6 sm:px-8 lg:px-20">
      <h2 className="mb-5 font-['Pretendard',sans-serif] text-[20px] font-extrabold">
        영화 목록
      </h2>

      {isLoading ? (
        <p className="py-16 text-center text-[#687182]">불러오는 중...</p>
      ) : errorMessage ? (
        <p className="py-16 text-center text-[#687182]">{errorMessage}</p>
      ) : movies.length === 0 ? (
        <p className="py-16 text-center text-[#687182]">
          표시할 영화가 없어요.
        </p>
      ) : (
        <>
          <MovieGrid movies={movies} />
          <Pagination />
        </>
      )}
    </main>
  );
}