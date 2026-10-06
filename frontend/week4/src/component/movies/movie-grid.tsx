import MovieCard from "./movie-card";
import { movies } from "../../data/movie";

export default function MovieGrid() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 
            justify-items-center gap-4">
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
}