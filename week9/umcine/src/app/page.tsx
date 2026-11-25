import type { Metadata } from "next";
import { MovieListPage } from "../views/movies/movie-list-page";

export const metadata: Metadata = {
  title: "영화 목록 | UMCine",
};

export default function HomePage() {
  return <MovieListPage />;
}
