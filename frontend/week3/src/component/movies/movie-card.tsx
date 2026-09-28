import { Link } from "@tanstack/react-router";
import type { Movie } from "../../types/movie";
import { cn } from "../../utils/cn";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (movieId: number) => void;
}

export default function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
    return (
        <div className="w-full max-w-[220px]">
            <div className="relative w-full aspect-[4/5] overflow-hidden rounded-lg">
                <Link to="/movies/$movieId" params={{ movieId: String(movie.id) }}>
                    <img className="w-full h-full object-cover"
                        src={movie.posterPath}
                        alt={movie.title} />
                </Link>
                <button
                    className={cn(
                        "absolute right-2 top-2 w-[12%] aspect-square rounded-lg border-2",
                        movie.isBookmarked ? "bg-blue-500 border-blue-500 hover:bg-blue-600 hover:border-blue-600" 
                            : "bg-gray-800 border-white  hover:bg-blue-200 hover:border-blue-200",
                    )}
                    onClick={() => onToggleBookmark(movie.id)}
                >
                    <img
                        className="w-full h-full object-contain p-[2px]"
                        src={movie.isBookmarked ? "/icons/movie-icons/bookmark.svg" : "/icons/movie-icons/bookmark-outline.svg"}
                        alt={movie.isBookmarked ? "북마크 해제" : "북마크"}
                    />
                </button>
            </div>
            <h3 className="text-lg font-bold mt-1">{movie.title}</h3>
            <p className="text-sm text-gray-500">{movie.releaseDate}</p>
        </div>
    );
}