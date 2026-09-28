import MovieGrid from "../../component/movies/movie-grid";

export function MovieListPage() {
  return (
    <div>
      <h1 className="pt-6 mb-4 mb-0 text-left text-2xl font-bold">영화 목록</h1>
      <MovieGrid />
    </div>
  );
}