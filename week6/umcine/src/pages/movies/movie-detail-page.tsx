import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import { BookmarkButton } from "../../components/bookmark-button";
import { getMovieDetailErrorMessage } from "../../utils/movies/get-movie-detail-error-message";
import {
  getTmdbBackdropUrl,
  getTmdbPosterUrl,
} from "../../utils/movies/tmdb-image";

export function MovieDetailPage() {
  const { movieId: movieIdParam } = useParams({ from: "/movies/$movieId" });
  const movieId = Number(movieIdParam);
  const isValidMovieId = Number.isInteger(movieId) && movieId > 0;

  const movieDetailQuery = useQuery({
    queryKey: ["movies", "detail", movieId],
    queryFn: () => getMovieDetail(movieId),
    enabled: isValidMovieId,
    staleTime: 30 * 1000,
  });

  if (!isValidMovieId) {
    return (
      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-8">
        올바르지 않은 영화 번호예요.
      </main>
    );
  }

  if (movieDetailQuery.isPending) {
    return (
      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-8">
        영화 정보를 불러오는 중이에요.
      </main>
    );
  }

  if (movieDetailQuery.isError) {
    return (
      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-8">
        {getMovieDetailErrorMessage(movieDetailQuery.error)}
      </main>
    );
  }

  const movie = movieDetailQuery.data;
  const posterUrl = getTmdbPosterUrl(movie.poster_path);
  const backdropUrl = getTmdbBackdropUrl(movie.backdrop_path);
  const runtimeText =
    movie.runtime === null
      ? "상영 시간 정보가 없어요."
      : `${Math.floor(movie.runtime / 60)}시간 ${movie.runtime % 60}분`;

  return (
    <main className="relative flex-1 overflow-hidden bg-gray-900 text-white">
      {backdropUrl ? (
        <img
          src={backdropUrl}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 size-full object-cover opacity-30"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-700 text-sm text-gray-400">
          이미지 없음
        </div>
      )}
      <div className="relative mx-auto max-w-7xl px-6 pt-6 pb-12">
        <Link to="/" className="text-sm text-white/80">
          영화 목록
        </Link>
        <div className="mt-8 flex flex-col gap-8 sm:flex-row">
          <div className="relative w-48 shrink-0 sm:w-60">
            {posterUrl ? (
              <img
                src={posterUrl}
                alt={`${movie.title} 포스터`}
                className="aspect-[7/10] w-full rounded-[10px] object-cover"
              />
            ) : (
              <div className="flex aspect-[7/10] w-full items-center justify-center rounded-[10px] bg-gray-300 text-sm text-gray-500">
                이미지 없음
              </div>
            )}
            <BookmarkButton movieId={movie.id} />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold">{movie.title}</h1>
            <p className="text-lg text-white/70">{movie.original_title}</p>
            <p className="text-sm text-white/70">{movie.release_date}</p>
            <p className="text-sm text-white/70">
              {movie.genres.map((genre) => genre.name).join(", ")}
            </p>
            <p className="text-sm text-white/70">{runtimeText}</p>
            <h2 className="mt-6 text-xl font-bold">{movie.tagline}</h2>
            <p className="max-w-3xl leading-7 text-white/90">{movie.overview}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
