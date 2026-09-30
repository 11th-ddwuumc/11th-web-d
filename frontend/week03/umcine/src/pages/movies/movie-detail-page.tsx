import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Route } from "../../routes/movies/$movieId";
import { movies } from "../../data/movies";
import { cn } from "../../utils/cn";

export function MovieDetailPage() {
  const { movieId } = Route.useParams();

  const movie = movies.find(
    (movie) => movie.id === Number(movieId),
  );

  if (!movie) {
    return (
      <main className="min-h-[60vh] bg-[#F5F6F8] px-4 py-16 text-center">
        <h1 className="text-xl font-bold">
          영화를 찾을 수 없어요.
        </h1>
      </main>
    );
  }

  // 영화가 바뀌면 즐겨찾기·평점 입력 상태도 새로 시작합니다.
  return <MovieDetailContent key={movie.id} movie={movie} />;
}

type MovieDetailContentProps = {
  movie: (typeof movies)[number];
};

function MovieDetailContent({ movie }: MovieDetailContentProps) {
  const [isBookmarked, setIsBookmarked] = useState(movie.isBookmarked);
  const [rating, setRating] = useState(0);
  const [memo, setMemo] = useState("");
  const [saveMessage, setSaveMessage] = useState("");

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
        <img
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
          src={movie.backdropPath}
          alt={`${movie.title} 배경`}
        />

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
              {movie.originalTitle}
            </p>

            <p className="mt-2 text-xs font-semibold text-white/90">
              {movie.releaseDate}
              {" · "}
              {movie.genres.join(" · ")}
              {" · "}
              {movie.runtime}
            </p>
          </div>
        </div>
      </section>

      {/* 포스터 / 줄거리 / 내 평점 */}
      <section className="mx-auto grid w-full max-w-[1280px] flex-1 grid-cols-1 gap-6 px-4 py-6 sm:px-8 md:grid-cols-[180px_minmax(0,1fr)] lg:grid-cols-[180px_minmax(0,1fr)_320px] lg:px-20">
        <div>
          <img
            className="w-[180px] max-w-full rounded-[10px] shadow-lg"
            src={movie.posterPath}
            alt={`${movie.title} 포스터`}
          />
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
            onClick={() => setIsBookmarked((current) => !current)}
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
          <h2
            id="my-rating-title"
            className="text-lg font-extrabold"
          >
            내 평점
          </h2>

          <p className="mt-1 text-xs text-[#969DA8]">
            별점을 줄 수, 후기는 선택이에요.
          </p>

          <div
            className="mt-3 flex gap-2"
            role="group"
            aria-label="별점 선택"
          >
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

          <p
            className="mt-2 text-xs text-[#687182]"
            role="status"
          >
            {saveMessage}
          </p>
        </section>
      </section>

      {/* 하단 안내 */}
      <footer className="mt-16 border-t border-[#E2E5EA] bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-5 text-right text-[10px] text-[#687182] sm:px-8 lg:px-20">
          This product uses the TMDB API but is not endorsed or certified
          by{" "}
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
