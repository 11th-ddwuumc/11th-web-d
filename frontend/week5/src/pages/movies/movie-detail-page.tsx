import { Link, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useBookmarkStore } from "../../stores/bookmark-store";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image";
import { getMovieDetailErrorMessage } from "../../utils/movies/get-movie-detail-error-message";
import type { TmdbMovieDetail } from "../../api/movies/models";
import MovieDetailSkeleton from "../../component/movies/movie-detail-skeleton";
import Footer from "../../component/layout/footer";

interface MovieDetailResult {
  movieId: string;
  movie: TmdbMovieDetail | null;
  errorMessage: string | null;
}

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  // 응답을 받은 movieId와 함께 저장해서, 현재 movieId와 다르면 아직 로딩 중
  const [result, setResult] = useState<MovieDetailResult | null>(null);
  const isLoading = result?.movieId !== movieId;

  useEffect(() => {
    let ignore = false;

    getMovieDetail(Number(movieId))
      .then((movie) => {
        if (!ignore) setResult({ movieId, movie, errorMessage: null });
      })
      .catch((error: unknown) => {
        if (!ignore) {
          setResult({
            movieId,
            movie: null,
            errorMessage: getMovieDetailErrorMessage(error),
          });
        }
      });

    return () => {
      ignore = true;
    };
  }, [movieId]);

  const isBookmarked = useBookmarkStore((state) =>
    state.bookmarkedMovieIds.includes(Number(movieId)),
  );
  const toggleBookmark = useBookmarkStore(
    (state) => state.toggleBookmark,
  );
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  if (isLoading) {
    return (
      <>
        <MovieDetailSkeleton />
      </>
    );
  }

  const movie = result.movie;

  if (!movie) {
    return (
      <main className="flex flex-col items-center gap-4 px-4 pt-24">
        <p className="text-sm text-red-500">{result.errorMessage}</p>
        <Link to="/" className="text-sm font-bold text-blue-600 hover:text-blue-300">
          영화 목록으로 돌아가기
        </Link>
      </main>
    );
  }

  function handleSaveRating() {
    setIsSaved(true);
  }

  function runtimeToHoursAndMinutes(runtime: number) {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}시간 ${minutes}분`;
  }

  return (
    <div className="-mx-4 -mb-16 bg-white sm:-mx-6 md:-mx-10 lg:-mx-20">
      <div className="relative h-80 w-full overflow-hidden">
        <img
          src={getTmdbPosterUrl(movie.backdrop_path) ?? "/images/no-backdrop.png"}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
        <Link
          to="/"
          className="absolute left-4 top-6 inline-flex items-center gap-1 text-sm font-semibold text-white hover:text-gray-200 sm:left-6 md:left-10 lg:left-20"
        >
          <img
            src="/icons/movie-icons/chevron-left.svg"
            alt=""
            className="h-4 w-4 invert"
          />
          영화 목록
        </Link>
        <div className="absolute bottom-8 left-4 flex flex-col gap-1 text-white sm:left-6 md:left-10 lg:left-20">
          <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">{movie.title}</h1>
          <p className="text-sm text-gray-300">{movie.original_title}</p>
          <p className="text-sm font-semibold">
            {movie.release_date}&nbsp;&nbsp;{movie.genres.map((genre: { name: string }) => genre.name).join(" · ")}&nbsp;&nbsp;
            {movie.runtime == null
              ? "상영 시간 정보 없음"
              : runtimeToHoursAndMinutes(movie.runtime)}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-10 px-4 py-10 sm:px-6 md:px-10 lg:flex-row lg:px-20">
        <div className="flex flex-1 gap-6 border-b border-gray-200 pb-10 lg:border-b-0 lg:border-r lg:pr-10 lg:pb-0">
          <img
            src={getTmdbPosterUrl(movie.poster_path) ?? "/images/no-poster.png"}
            alt={`${movie.title} 포스터`}
            className="h-[200px] w-[144px] shrink-0 rounded-lg object-cover"
          />
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-bold text-[#111]">{movie.tagline}</h2>
            <p className="text-sm leading-relaxed text-gray-600">{movie.overview}</p>
            <button
              type="button"
              onClick={() => {
                toggleBookmark(Number(movieId));
              }}
              className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:cursor-pointer hover:bg-blue-700"
            >
              <img
                src={
                  isBookmarked
                    ? "/icons/movie-icons/bookmark.svg"
                    : "/icons/movie-icons/bookmark-outline.svg"
                }
                alt=""
                className="h-4 w-4"
              />
              즐겨찾기
            </button>
          </div>
        </div>

        <div className="w-full lg:w-[280px] lg:shrink-0">
          <h2 className="mb-1 text-lg font-bold text-[#111]">내 평점</h2>
          <p className="mb-3 text-xs text-gray-400">별점은 필수, 후기는 선택이에요.</p>
          <div className="mb-4 flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                aria-label={`${star}점`}
                onClick={() => {
                  setRating(star);
                  setIsSaved(false);
                }}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="hover:cursor-pointer"
              >
                <img
                  src={
                    star <= (hoverRating || rating)
                      ? "/icons/movie-icons/star.svg"
                      : "/icons/movie-icons/star-outline.svg"
                  }
                  alt=""
                  className="h-6 w-6"
                />
              </button>
            ))}
          </div>
          <textarea
            value={review}
            onChange={(event) => {
              setReview(event.target.value);
              setIsSaved(false);
            }}
            placeholder="영화를 보고 느낀 점을 남겨주세요."
            className="mb-4 h-24 w-full resize-none rounded-lg border border-gray-200 p-3 text-sm text-[#111] placeholder:text-gray-400 focus:border-black focus:outline-none"
          />
          <button
            type="button"
            onClick={handleSaveRating}
            disabled={rating === 0}
            className="w-full rounded-lg bg-black py-2.5 text-sm font-semibold text-white hover:cursor-pointer hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            평점 저장
          </button>
          {isSaved && (
            <p className="mt-2 text-center text-xs text-gray-400">평점이 저장되었어요.</p>
          )}
        </div>
      </div>
      {!isLoading && <Footer />}
    </div>
  );
}
