import { useEffect, useState } from "react";
import MovieGrid from "../../component/movies/movie-grid";
import MovieGridSkeleton from "../../component/movies/movie-grid-skeleton";
import Footer from "../../component/layout/footer";
import type { TmdbMovieListItem } from "../../api/movies/models";
import { getMovies } from "../../api/movies/get-movies";

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
    <div>
      <h1 className="pt-6 mb-4 text-left text-2xl font-bold">
        영화 목록
      </h1>
      {errorMessage ? (
        <p className="py-10 text-center text-sm text-red-500">{errorMessage}</p>
      ) : isLoading ? (
        <MovieGridSkeleton />
      ) : (
        <MovieGrid movies={movies} />
      )}
      <Footer />
    </div>
  );
}