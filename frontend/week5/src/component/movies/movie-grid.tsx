import type { TmdbMovieListItem } from "../../api/movies/models";
import MovieCard from "./movie-card";

interface MovieGridProps {
    movies: TmdbMovieListItem[];
}

export default function MovieGrid({ movies }: MovieGridProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 
            justify-items-center gap-4">
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
}