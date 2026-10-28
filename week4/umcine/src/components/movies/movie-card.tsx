import { Link } from "@tanstack/react-router";
import type { Movie } from "../../types/movie";
import { BookmarkButton } from "../bookmark-button";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
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
        <BookmarkButton movieId={movie.id} />
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
