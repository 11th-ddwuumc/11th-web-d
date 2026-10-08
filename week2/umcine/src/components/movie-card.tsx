import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (movieId: number) => void;
}

/** 영화 정보와 북마크 상태를 표시하고 클릭 시 영화 ID로 변경을 요청합니다. */
export default function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
  const bookmarkIcon = movie.isBookmarked
    ? "/icons/bookmark.svg"
    : "/icons/bookmark-outline.svg";

  return (
    <article className="movie-card">
      <div className="movie-card-poster">
        <img src={movie.posterPath} alt={movie.title} />
        <button
          className={movie.isBookmarked ? "bookmark-button active" : "bookmark-button"}
          aria-label={`${movie.title} 북마크`}
          aria-pressed={movie.isBookmarked}
          onClick={() => onToggleBookmark(movie.id)}
        >
          <img src={bookmarkIcon} alt="" />
        </button>
      </div>
      <h2 className="movie-card-title">{movie.title}</h2>
      <p className="movie-card-date">{movie.releaseDate}</p>
    </article>
  );
}
