import type { Movie } from "../../types/movie";
import { Link } from "@tanstack/react-router";
import { cn } from "../../utils/cn";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (movieId: number) => void;
}

export default function MovieCard({
  movie,
  onToggleBookmark,
}: MovieCardProps) {
  return (
    <div className="flex w-full min-w-0 flex-col gap-1">
      <div className="relative">
        <img
          className="block aspect-[241.6/274] w-full rounded-[10px] object-cover"
          src={movie.posterPath}
          alt={movie.title}
        />

        <button
          className={cn(
            "absolute right-2 top-2 box-border flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-[8px] border border-solid px-[6px] py-[7.5px]",
            movie.isBookmarked
              ? "border-[var(--color-action-primary,#2563EB)] bg-[var(--color-action-primary,#2563EB)]"
              : "border-white bg-black/40",
          )}
          onClick={() => onToggleBookmark(movie.id)}
          type="button"
          aria-label={movie.isBookmarked ? "북마크 해제" : "북마크 추가"}
          aria-pressed={movie.isBookmarked}
        >
          <img
            className="h-6 w-6 shrink-0"
            src={
              movie.isBookmarked
                ? "/icons/movie-icons/bookmark.svg"
                : "/icons/movie-icons/bookmark-outline.svg"
            }
            alt=""
          />
        </button>
      </div>

      <p className="m-0 h-[22px] w-full pt-[5px] font-['Pretendard',sans-serif] text-[14px] leading-none font-extrabold tracking-normal text-[var(--color-text-primary,#17191E)]">
        <Link
          className="block truncate text-inherit no-underline"
          to="/movies/$movieId"
          params={{ movieId: String(movie.id) }}
        >
          {movie.title}
        </Link>
      </p>

      <p className="m-0 h-[14px] w-full font-['Pretendard',sans-serif] text-[12px] leading-none font-normal tracking-normal text-[var(--color-text-tertiary,#969DA8)]">
        {movie.releaseDate}
      </p>
    </div>
  );
}
