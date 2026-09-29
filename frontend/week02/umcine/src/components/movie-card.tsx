import type { Movie } from "../types/movie";
import "./movie-card.css";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (movieId: number) => void;
}

export default function MovieCard({movie, onToggleBookmark} : MovieCardProps) {
  return(
  <div className="movie-card">
        <div className="poster-wrapper">
          <img
            className="poster"
            src={movie.posterPath}
            alt={movie.title}
          />
          <button
            className={movie.isBookmarked ? "bookmark-button active" : "bookmark-button"}
            onClick={() => onToggleBookmark(movie.id)} type="button"
          >
            <img
              className="bookmark-icon"
              src={movie.isBookmarked ? "/icons/movie-icons/bookmark.svg" : "/icons/movie-icons/bookmark-outline.svg"}
              alt={movie.isBookmarked ? "북마크 해제" : "북마크 추가"}
            />
          </button>
        </div>
        <p className="movie-title">{movie.title}</p>
        <p className="movie-date">{movie.releaseDate}</p>
  </div>
  );
}