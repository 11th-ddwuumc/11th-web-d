import { useState } from "react";
import MovieCard from "./movie-card";
import type { Movie } from "../../types/movie";
import { movies as initialMovies } from "../../data/movie";

export default function MovieGrid() {
    const [movies, setMovies] = useState<Movie[]>(initialMovies);

    function handleToggleBookmark(movieId: number) {
        setMovies((prevMovies) =>
            prevMovies.map((m) =>
                m.id === movieId ? { ...m, isBookmarked: !m.isBookmarked } : m
            )
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 
            justify-items-center gap-4">
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} onToggleBookmark={handleToggleBookmark} />
            ))}
        </div>
    );
}