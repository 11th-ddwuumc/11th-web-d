import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useQueries } from "@tanstack/react-query";
import { movieQueries } from "../../api/movies/movie-queries";
import type { TmdbMovieListItem } from "../../api/movies/models";
import { useBookmarkStore } from "../../stores/bookmark-store";
import MovieCard from "../../component/movies/movie-card";
import Pagination from "../../component/movies/pagination";

// TODO: 내 정보 조회 API 연동 후 교체
const PROFILE = {
  nickname: "",
  email: "",
  profileImageUrl: null as string | null,
};

const FAVORITES_PAGE_SIZE = 12;

export default function ProfilePage() {
  const [page, setPage] = useState(1);
  const bookmarkedMovieIds = useBookmarkStore(
    (state) => state.bookmarkedMovieIds,
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
          to="/profile/edit"
          className="h-8 px-4 inline-flex items-center rounded-lg bg-blue-600 text-xs font-bold text-white shrink-0"
        >
          정보 수정
        </Link>
      </div>

      <div className="py-6 border-b border-[#e5e7eb]">
        <h3 className="text-sm font-bold text-[#111] mb-4">기본 정보</h3>
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-[#e5e7eb] flex items-center justify-center overflow-hidden shrink-0">
            {PROFILE.profileImageUrl ? (
              <img
                src={PROFILE.profileImageUrl}
                alt="프로필 이미지"
                className="w-full h-full object-cover"
              />
            ) : (
              <img
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
                {PROFILE.nickname}
              </dd>
            </div>
            <div>
              <dt className="text-[10px] text-[#999]">이메일</dt>
              <dd className="text-sm font-bold text-[#111] break-all">
                {PROFILE.email}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="py-6">
        <h3 className="text-sm font-bold text-[#111] mb-4">내 즐겨찾기</h3>
        {bookmarkedMovieIds.length === 0 ? (
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
