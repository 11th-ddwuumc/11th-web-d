import type { Movie } from "../types/movie";
import "./movie-card.css";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (movieId: number) => void;
}

export default function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
    return (
        <div className="movie-card">
            <div className="movie-poster-container">
                <img className="movie-poster" src={movie.posterPath} alt={movie.title} />
                <button className={`bookmark-button${movie.isBookmarked ? " bookmarked" : ""}`} onClick={() => onToggleBookmark(movie.id)}>
                    <img
                        className="bookmark-icon"
                        src={movie.isBookmarked ? "/icons/movie-icons/bookmark.svg" : "/icons/movie-icons/bookmark-outline.svg"}
                        alt={movie.isBookmarked ? "북마크 해제" : "북마크"}
                    />
                </button>
            </div>
            <h3 className="movie-title">{movie.title}</h3>
            <p className="movie-release-date">{movie.releaseDate}</p>
        </div>
    );
}