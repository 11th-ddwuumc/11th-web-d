import type { TmdbMovieListItem } from "../../api/movies/models";
import MovieCard from "./movie-card";

interface MovieGridProps {
    movies: TmdbMovieListItem[];
    columns: number;
}

export default function MovieGrid({ movies, columns }: MovieGridProps) {
    return (
        <div className="grid justify-items-center gap-4"
            style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
}
