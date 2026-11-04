import { Link } from "@tanstack/react-router";
import type { TmdbMovieListItem } from "../../api/movies/models";
import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image";
import { BookmarkButton } from "../bookmark-button";

interface MovieCardProps {
  movie: TmdbMovieListItem;
}

export function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = getTmdbPosterUrl(movie.poster_path);

  return (
    <article>
      <div className="relative aspect-[7/8] overflow-hidden rounded-[10px] bg-gray-300">
        <Link to="/movies/$movieId" params={{ movieId: String(movie.id) }}>
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={movie.title}
              className="block size-full object-cover"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-sm text-gray-500">
              이미지 없음
            </div>
          )}
        </Link>
        <BookmarkButton movieId={movie.id} />
      </div>
      <Link
        to="/movies/$movieId"
        params={{ movieId: String(movie.id) }}
        className="text-gray-900 no-underline"
      >
        <h2 className="mt-2.5 mb-0.5 text-sm font-bold">{movie.title}</h2>
      </Link>
      <p className="text-xs text-gray-400">{movie.release_date}</p>
    </article>
  );
}
