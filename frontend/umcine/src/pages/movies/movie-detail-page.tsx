import { Link, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useBookmarkStore } from "../../stores/bookmark-store";
import { movieQueries } from "../../api/movies/movie-queries";
import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image";
import MovieDetailSkeleton from "../../component/movies/movie-detail-skeleton";
import Footer from "../../component/layout/footer";

export function MovieDetailPage() {
  const { movieId: movieIdParam } = useParams({ from: "/movies/$movieId" });
  const movieId = Number(movieIdParam);
  const isValidMovieId = Number.isInteger(movieId) && movieId > 0;

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

  const movieDetailQuery = useQuery({
    ...movieQueries.detail(movieId),
    enabled: isValidMovieId,
  });

  function handleSaveRating() {
    setIsSaved(true);
  }

  function runtimeToHoursAndMinutes(runtime: number) {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}시간 ${minutes}분`;
  }

  return (
    <>
      {!isValidMovieId ? (
        <p>올바르지 않은 영화 번호예요.</p>
      ) : movieDetailQuery.isPending ? (
        <MovieDetailSkeleton /> // 기존 로딩 UI가 있다면 재사용해요.
      ) : movieDetailQuery.isError ? (
        <p><main className="flex flex-col items-center gap-4 px-4 pt-24">
        <p className="text-sm text-red-500">{movieDetailQuery.error.message}</p>
        <Link to="/" className="text-sm font-bold text-blue-600 hover:text-blue-300">
          영화 목록으로 돌아가기
        </Link>
      </main></p> // 기존 오류 UI가 있다면 재사용해요.
      ) : (
        <div className="-mx-4 -mb-16 bg-white sm:-mx-6 md:-mx-10 lg:-mx-20">
      <div className="relative h-80 w-full overflow-hidden">
        <img
          src={getTmdbPosterUrl(movieDetailQuery.data?.backdrop_path) ?? "/images/no-backdrop.png"}
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
          <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">{movieDetailQuery.data?.title}</h1>
          <p className="text-sm text-gray-300">{movieDetailQuery.data?.original_title}</p>
          <p className="text-sm font-semibold">
            {movieDetailQuery.data?.release_date}&nbsp;&nbsp;{movieDetailQuery.data?.genres.map((genre: { name: string }) => genre.name).join(" · ")}&nbsp;&nbsp;
            {movieDetailQuery.data?.runtime == null
              ? "상영 시간 정보 없음"
              : runtimeToHoursAndMinutes(movieDetailQuery.data?.runtime)}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-10 px-4 py-10 sm:px-6 md:px-10 lg:flex-row lg:px-20">
        <div className="flex flex-1 gap-6 border-b border-gray-200 pb-10 lg:border-b-0 lg:border-r lg:pr-10 lg:pb-0">
          <img
            src={getTmdbPosterUrl(movieDetailQuery.data?.poster_path) ?? "/images/no-poster.png"}
            alt={`${movieDetailQuery.data?.title} 포스터`}
            className="h-[200px] w-[144px] shrink-0 rounded-lg object-cover"
          />
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-bold text-[#111]">{movieDetailQuery.data?.tagline}</h2>
            <p className="text-sm leading-relaxed text-gray-600">{movieDetailQuery.data?.overview}</p>
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
      <Footer />
    </div>
      )}
    </>
  );
}


