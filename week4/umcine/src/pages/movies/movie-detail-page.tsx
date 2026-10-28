import { Link, useParams } from "@tanstack/react-router";
import { movies } from "../../data/movies";
import { BookmarkButton } from "../../components/bookmark-button";

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const movie = movies.find((item) => item.id === Number(movieId));

  if (!movie) {
    return (
      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-8">
        영화를 찾을 수 없어요.
      </main>
    );
  }

  return (
    <main className="relative flex-1 overflow-hidden bg-gray-900 text-white">
      <img
        src={movie.backdropPath}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 size-full object-cover opacity-30"
      />
      <div className="relative mx-auto max-w-7xl px-6 pt-6 pb-12">
        <Link to="/" className="text-sm text-white/80">
          영화 목록
        </Link>
        <div className="mt-8 flex flex-col gap-8 sm:flex-row">
          <div className="relative w-48 shrink-0 sm:w-60">
            <img
              src={movie.posterPath}
              alt={`${movie.title} 포스터`}
              className="aspect-[7/10] w-full rounded-[10px] object-cover"
            />
            <BookmarkButton movieId={movie.id} />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold">{movie.title}</h1>
            <p className="text-lg text-white/70">{movie.originalTitle}</p>
            <p className="text-sm text-white/70">{movie.releaseDate}</p>
            <p className="text-sm text-white/70">{movie.genres.join(" · ")}</p>
            <p className="text-sm text-white/70">{movie.runtime}</p>
            <h2 className="mt-6 text-xl font-bold">{movie.tagline}</h2>
            <p className="max-w-3xl leading-7 text-white/90">{movie.overview}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
