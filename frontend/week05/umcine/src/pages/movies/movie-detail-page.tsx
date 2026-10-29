import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Route } from "../../routes/movies/$movieId";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import type { TmdbMovieDetail } from "../../api/movies/models";
import { getMovieDetailErrorMessage } from "../../utils/movies/get-movie-detail-error-message";
import { cn } from "../../utils/cn";
import { useBookmarkStore } from "../../stores/bookmark-store";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

function formatRuntime(runtime: number | null) {
  if (runtime === null) return "상영 시간 정보가 없어요.";

  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  if (hours === 0) return `${minutes}분`;
  if (minutes === 0) return `${hours}시간`;
  return `${hours}시간 ${minutes}분`;
}

export function MovieDetailPage() {
  const { movieId } = Route.useParams();

  const parsedMovieId = Number(movieId);
  const isValidMovieId = Number.isInteger(parsedMovieId) && parsedMovieId > 0;

  const [movie, setMovie] = useState<TmdbMovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // 유효하지 않은 번호는 요청하지 않고, 데이터를 비우고 로딩을 끝내요.
    if (!isValidMovieId) {
      setMovie(null);
      setErrorMessage(null);
      setIsLoading(false);
      return;
    }

    let ignore = false;

    setMovie(null);
    setIsLoading(true);
    setErrorMessage(null);

    getMovieDetail(parsedMovieId)
      .then((response) => {
        if (!ignore) setMovie(response);
      })
      .catch((error: unknown) => {
        if (!ignore) setErrorMessage(getMovieDetailErrorMessage(error));
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [isValidMovieId, parsedMovieId]);

  if (!isValidMovieId) {
    return (
      <main className="min-h-[60vh] bg-[#F5F6F8] px-4 py-16 text-center">
        <h1 className="text-xl font-bold">올바르지 않은 영화 번호예요.</h1>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="min-h-[60vh] bg-[#F5F6F8] px-4 py-16 text-center">
        <p className="text-[#687182]">불러오는 중...</p>
      </main>
    );
  }

  if (errorMessage || !movie) {
    return (
      <main className="min-h-[60vh] bg-[#F5F6F8] px-4 py-16 text-center">
        <h1 className="text-xl font-bold">
          {errorMessage ?? "영화를 찾을 수 없어요."}
        </h1>
      </main>
    );
  }

  // 영화가 바뀌면 즐겨찾기·평점 입력 상태도 새로 시작합니다.
  return <MovieDetailContent key={movie.id} movie={movie} />;
}

type MovieDetailContentProps = {
  movie: TmdbMovieDetail;
};

function MovieDetailContent({ movie }: MovieDetailContentProps) {
  const isBookmarked = useBookmarkStore((state) =>
    state.bookmarkedMovieIds.includes(movie.id),
  );
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);
  const [rating, setRating] = useState(0);
  const [memo, setMemo] = useState("");
  const [saveMessage, setSaveMessage] = useState("");

  const backdropUrl = movie.backdrop_path
    ? `${IMAGE_BASE_URL}/w1280${movie.backdrop_path}`
    : undefined;
  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}/w500${movie.poster_path}`
    : undefined;

  // 값이 없는 항목은 빼고 " · "로 이어 붙여요.
  const metaText = [
    movie.release_date,
    movie.genres.map((genre) => genre.name).join(", "),
    formatRuntime(movie.runtime),
  ]
    .filter(Boolean)
    .join(" · ");

  function handleSaveRating() {
    if (rating === 0) {
      setSaveMessage("별점을 선택해 주세요.");
      return;
    }

    // 현재 페이지에서의 저장 확인용입니다.
    // 새로고침 후 유지하려면 별도의 저장 처리가 필요합니다.
    setSaveMessage(`${rating}점과 메모를 현재 화면에 기록했어요.`);
  }

  return (
    <main className="flex min-h-[calc(100vh-80px)] flex-col bg-[#F5F6F8] font-['Pretendard',sans-serif] text-[#17191E]">
      {/* 배경 이미지 */}
      <section className="relative isolate overflow-hidden bg-[#17191E]">
        {backdropUrl && (
          <img
            className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
            src={backdropUrl}
            alt={`${movie.title} 배경`}
          />
        )}

        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/70 via-black/25 to-transparent" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/50 to-transparent" />

        <div className="mx-auto flex min-h-[320px] max-w-[1280px] flex-col px-4 py-6 text-white sm:min-h-[360px] sm:px-8 lg:px-20">
          <Link
            className="inline-flex items-center gap-2 self-start text-xs font-semibold text-white no-underline hover:underline"
            to="/"
          >
            <span aria-hidden="true">〈</span>
            영화 목록
          </Link>

          <div className="mt-auto pt-24">
            <h1 className="break-words text-3xl font-extrabold tracking-tight sm:text-[40px]">
              {movie.title}
            </h1>

            <p className="mt-2 text-sm text-white/90">
              {movie.original_title}
            </p>

            <p className="mt-2 text-xs font-semibold text-white/90">
              {metaText}
            </p>
          </div>
        </div>
      </section>

      {/* 포스터 / 줄거리 / 내 평점 */}
      <section className="mx-auto grid w-full max-w-[1280px] flex-1 grid-cols-1 gap-6 px-4 py-6 sm:px-8 md:grid-cols-[180px_minmax(0,1fr)] lg:grid-cols-[180px_minmax(0,1fr)_320px] lg:px-20">
        <div>
          {posterUrl && (
            <img
              className="w-[180px] max-w-full rounded-[10px] shadow-lg"
              src={posterUrl}
              alt={`${movie.title} 포스터`}
            />
          )}
        </div>

        <div className="min-w-0">
          <h2 className="text-lg font-extrabold">
            {movie.tagline || movie.title}
          </h2>

          <p className="mt-3 whitespace-pre-line break-words text-sm leading-6 text-[#687182]">
            {movie.overview}
          </p>

          <button
            className={cn(
              "mt-4 inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-bold",
              isBookmarked
                ? "bg-[#2563EB] text-white"
                : "border border-[#D9DEE7] bg-white text-[#17191E]",
            )}
            type="button"
            aria-pressed={isBookmarked}
            onClick={() => toggleBookmark(movie.id)}
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill={isBookmarked ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M6 3h12v18l-6-4-6 4V3Z" />
            </svg>
            즐겨찾기
          </button>
        </div>

        <section
          className="min-w-0 md:col-span-2 lg:col-span-1 lg:self-start lg:border-l lg:border-[#E2E5EA] lg:pl-7"
          aria-labelledby="my-rating-title"
        >
          <h2 id="my-rating-title" className="text-lg font-extrabold">
            내 평점
          </h2>

          <p className="mt-1 text-xs text-[#969DA8]">
            별점을 줄 수, 후기는 선택이에요.
          </p>

          <div className="mt-3 flex gap-2" role="group" aria-label="별점 선택">
            {[1, 2, 3, 4, 5].map((score) => (
              <button
                key={score}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-md border bg-white text-xl",
                  score <= rating
                    ? "border-[#2563EB] text-[#2563EB]"
                    : "border-[#E2E5EA] text-[#687182]",
                )}
                type="button"
                aria-label={`${score}점`}
                aria-pressed={rating === score}
                onClick={() => {
                  setRating(score);
                  setSaveMessage("");
                }}
              >
                ★
              </button>
            ))}
          </div>

          <textarea
            className="mt-3 min-h-[96px] w-full resize-y rounded-md border border-[#E2E5EA] bg-white p-3 text-sm outline-none placeholder:text-[#969DA8] focus:border-[#2563EB]"
            aria-label="영화 후기"
            placeholder="영화를 보고 느낀 점을 남겨보세요."
            value={memo}
            onChange={(event) => {
              setMemo(event.target.value);
              setSaveMessage("");
            }}
          />

          <button
            className="mt-2 w-full rounded-md bg-[#17191E] px-4 py-3 text-sm font-bold text-white hover:bg-[#34373C]"
            type="button"
            onClick={handleSaveRating}
          >
            평점 저장
          </button>

          <p className="mt-2 text-xs text-[#687182]" role="status">
            {saveMessage}
          </p>
        </section>
      </section>

      {/* 하단 안내 */}
      <footer className="mt-16 border-t border-[#E2E5EA] bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-5 text-right text-[10px] text-[#687182] sm:px-8 lg:px-20">
          This product uses the TMDB API but is not endorsed or certified by{" "}
          <a
            className="text-inherit underline"
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noreferrer"
          >
            TMDB
          </a>
          .
        </div>
      </footer>
    </main>
  );
}