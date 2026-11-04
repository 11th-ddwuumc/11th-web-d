import type { TmdbMovieListItem } from "../../api/movies/models";
import type { Movie } from "../../types/movie";
import "../movie-grid.css";
import MovieCard from "./movie-card";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

interface MovieGridProps {
  movies: TmdbMovieListItem[];
}

function toMovie(item: TmdbMovieListItem): Movie {
  return {
    id: item.id,
    title: item.title,
    originalTitle: item.original_title,
    releaseDate: item.release_date,
    posterPath: item.poster_path
      ? `${IMAGE_BASE_URL}/w500${item.poster_path}`
      : "",
    backdropPath: item.backdrop_path
      ? `${IMAGE_BASE_URL}/w1280${item.backdrop_path}`
      : "",
    overview: item.overview,
    // 목록 API에는 없는 값이라 기본값으로 채워요
    genres: [],
    runtime: "",
    tagline: "",
    isBookmarked: false,
  };
}

export default function MovieGrid({ movies }: MovieGridProps) {
  return (
    <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {/* 영화 카드 목록 */}
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={toMovie(movie)} />
      ))}
    </section>
  );
}