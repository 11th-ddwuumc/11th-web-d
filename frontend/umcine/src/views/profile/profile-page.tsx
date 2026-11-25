"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useMeQuery } from "../../hooks/use-me-query";
import { ratingQueries } from "../../api/movies/ratings/rating-queries";
import { movieQueries } from "../../api/movies/movie-queries";
import type { TmdbMovieListItem } from "../../api/movies/models";
import { useFavoritesQuery } from "../../hooks/use-favorites";
import MovieCard from "../../component/movies/movie-card";
import Pagination from "../../component/movies/pagination";

// TODO: 프로필 이미지 API 연동 후 교체
const PROFILE_IMAGE_URL = null as string | null;

const FAVORITES_PAGE_SIZE = 12;

export default function ProfilePage() {
  const meQuery = useMeQuery();
  const memberId = meQuery.data?.memberId;
  const ratingsQuery = useQuery({
    ...ratingQueries.memberList(memberId ?? 0),
    enabled: memberId !== undefined,
  });
  const ratings = ratingsQuery.data ?? [];
  const ratedMovies = useQueries({
    queries: ratings.map((rating) => movieQueries.detail(rating.movieId)),
  });
  const [page, setPage] = useState(1);
  const favoritesQuery = useFavoritesQuery();
  const bookmarkedMovieIds = (favoritesQuery.data ?? []).map(
    (favorite) => favorite.movieId,
  );

  const totalPages = Math.max(
    1,
    Math.ceil(bookmarkedMovieIds.length / FAVORITES_PAGE_SIZE),
  );
  // 즐겨찾기를 해제해서 페이지 수가 줄어든 경우를 대비
  const currentPage = Math.min(page, totalPages);
  const pageIds = bookmarkedMovieIds.slice(
    (currentPage - 1) * FAVORITES_PAGE_SIZE,
    currentPage * FAVORITES_PAGE_SIZE,
  );

  const favorites = useQueries({
    queries: pageIds.map((id) => movieQueries.detail(id)),
  });

  const favoriteMovies: TmdbMovieListItem[] = favorites.flatMap(({ data }) =>
    data ? [{ ...data, genre_ids: data.genres.map((genre) => genre.id) }] : [],
  );

  return (
    <section className="w-full max-w-[1000px] mx-auto pt-14 flex flex-col">
      <div className="flex items-center justify-between gap-4 pb-6 border-b border-[#e5e7eb]">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#111]">내 정보</h2>
        <Link
          href="/profile/edit"
          className="h-8 px-4 inline-flex items-center rounded-lg bg-blue-600 text-xs font-bold text-white shrink-0"
        >
          정보 수정
        </Link>
      </div>

      <div className="py-6 border-b border-[#e5e7eb]">
        <h3 className="text-sm font-bold text-[#111] mb-4">기본 정보</h3>
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-[#e5e7eb] flex items-center justify-center overflow-hidden shrink-0">
            {PROFILE_IMAGE_URL ? (
              // 프로필 이미지 API가 정해지기 전이라 어떤 주소든 오도록 최적화하지 않아요.
              <Image
                src={PROFILE_IMAGE_URL}
                alt="프로필 이미지"
                width={96}
                height={96}
                unoptimized
                className="w-full h-full object-cover"
              />
            ) : (
              <Image width={24} height={24}
                src="/icons/movie-icons/person.svg"
                alt="기본 프로필 이미지"
                className="w-6 h-6"
              />
            )}
          </div>
          <dl className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <dt className="text-[10px] text-[#999]">닉네임</dt>
              <dd className="text-sm font-bold text-[#111] break-all">
                {meQuery.data?.nickname}
              </dd>
            </div>
            <div>
              <dt className="text-[10px] text-[#999]">이메일</dt>
              <dd className="text-sm font-bold text-[#111] break-all">
                {meQuery.data?.email}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="py-6 border-b border-[#e5e7eb]">
        <h3 className="text-sm font-bold text-[#111] mb-4">내 평점</h3>
        {ratingsQuery.isPending ? (
          <p className="text-sm text-[#777]">불러오는 중...</p>
        ) : ratings.length === 0 ? (
          <p className="text-sm text-[#777]">아직 남긴 평점이 없어요.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {ratings.map((rating, index) => (
              <li key={rating.ratingId} className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <Link
                    href={`/movies/${rating.movieId}`}
                    className="text-sm font-bold text-[#111] hover:text-blue-600"
                  >
                    {ratedMovies[index]?.data?.title ?? `영화 ${rating.movieId}`}
                  </Link>
                  <span className="text-xs font-bold text-blue-600">
                    {"★".repeat(rating.score)}
                    {"☆".repeat(5 - rating.score)}
                  </span>
                </div>
                {rating.comment && (
                  <p className="text-sm text-[#555] break-all">{rating.comment}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="py-6">
        <h3 className="text-sm font-bold text-[#111] mb-4">내 즐겨찾기</h3>
        {favoritesQuery.isPending ? (
          <p className="text-sm text-[#777]">불러오는 중...</p>
        ) : bookmarkedMovieIds.length === 0 ? (
          <p className="text-sm text-[#777]">아직 즐겨찾기한 영화가 없어요.</p>
        ) : (
          <>
            <div className="flex flex-wrap gap-4">
              {favoriteMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
            <Pagination
              page={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </>
        )}
      </div>
    </section>
  );
}
