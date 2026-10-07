import { Link } from "@tanstack/react-router";
import type { Movie } from "../../types/movie";
import { cn } from "../../utils/cn";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (movieId: number) => void;
}

export function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
  const bookmarkIcon = movie.isBookmarked
    ? "/icons/bookmark.svg"
    : "/icons/bookmark-outline.svg";

  return (
    <article>
      <div className="relative aspect-[7/8] overflow-hidden rounded-[10px] bg-gray-300">
        <Link to="/movies/$movieId" params={{ movieId: String(movie.id) }}>
          <img
            src={movie.posterPath}
            alt={movie.title}
            className="block size-full object-cover"
          />
        </Link>
        <button
          type="button"
          className={cn(
            "absolute top-2 right-2 flex size-6 cursor-pointer items-center justify-center rounded border p-0",
            movie.isBookmarked
              ? "border-blue-600 bg-blue-600"
              : "border-white/40 bg-gray-900/75",
          )}
          aria-label={`${movie.title} 북마크`}
          aria-pressed={movie.isBookmarked}
          onClick={() => onToggleBookmark(movie.id)}
        >
          <img src={bookmarkIcon} alt="" className="size-3.5 invert" />
        </button>
      </div>
      <Link
        to="/movies/$movieId"
        params={{ movieId: String(movie.id) }}
        className="text-gray-900 no-underline"
      >
        <h2 className="mt-2.5 mb-0.5 text-sm font-bold">{movie.title}</h2>
      </Link>
      <p className="text-xs text-gray-400">{movie.releaseDate}</p>
    </article>
  );
}
