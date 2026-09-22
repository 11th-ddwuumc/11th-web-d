import { useState } from "react";
import "./movie-grid.css";
import MovieCard from "./movie-card";
import { movies as initialMovies } from "../data/movie";
import type { Movie } from "../types/movie";

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
        <div className="movie-grid">
            <h2 className="movie-grid-title">영화 목록</h2>
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} onToggleBookmark={handleToggleBookmark} />
            ))}
        </div>
    );
}