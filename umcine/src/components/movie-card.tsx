import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (movieId: number) => void;
}

export default function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
  return (
    <article className="movie-card">
      <div className="movie-card-poster">
        <img src={movie.posterPath} alt={movie.title} />
        <button
          type="button"
          className={
            movie.isBookmarked
              ? "bookmark-button bookmark-button-active"
              : "bookmark-button"
          }
          aria-pressed={movie.isBookmarked}
          aria-label={movie.isBookmarked ? "북마크 해제" : "북마크 추가"}
          onClick={() => onToggleBookmark(movie.id)}
        >
          <img
            src={
              movie.isBookmarked
                ? "/icons/bookmark.svg"
                : "/icons/bookmark-outline.svg"
            }
            alt=""
          />
        </button>
      </div>
      <h3 className="movie-card-title">{movie.title}</h3>
      <p className="movie-card-date">{movie.releaseDate}</p>
    </article>
  );
}