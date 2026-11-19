import { tmdbClient } from "../../tmdb-client";
import type { TmdbMovieDetail } from "../models";

type GetFavoritesMovieResponse = TmdbMovieDetail[];

function getFavoritesMovie() {
    return tmdbClient
        .get("favorites/{movieId}", {
            searchParams: { language: "ko-KR" },
        })
        .json<GetFavoritesMovieResponse>();
}

export { getFavoritesMovie, type GetFavoritesMovieResponse };