import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState, type SubmitEvent } from "react";
import { searchMovies } from "../../api/movies/search-movies";
import { BookmarkButton } from "../../components/bookmark-button";
import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image";

export function SearchPage() {
  const { query = "" } = useSearch({ from: "/search" });
  const navigate = useNavigate({ from: "/search" });
  const normalizedQuery = query.trim();
  const [searchText, setSearchText] = useState(query);

  const searchQuery = useQuery({
    queryKey: ["movies", "search", { query: normalizedQuery }],
    queryFn: () => searchMovies({ query: normalizedQuery }),
    enabled: normalizedQuery.length > 0,
  });

  const searchResults = searchQuery.data?.results ?? [];

  useEffect(() => {
    setSearchText(query);
  }, [query]);

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextQuery = searchText.trim();

    navigate({
      search: nextQuery ? { query: nextQuery } : {},
    });
  }

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-6 pt-8 pb-12">
      <h1 className="mb-6 text-[32px] font-bold">영화 검색</h1>
      <form onSubmit={handleSubmit} className="mb-8 flex gap-2">
        <input
          aria-label="검색어"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          className="h-10 flex-1 rounded-md border border-gray-200 bg-white px-3 text-sm"
        />
        <button
          type="submit"
          className="h-10 cursor-pointer rounded-md bg-blue-600 px-4 text-sm font-semibold text-white"
        >
          검색
        </button>
      </form>

      {!normalizedQuery ? (
        <p className="text-sm text-gray-500">검색어를 입력해 주세요.</p>
      ) : searchQuery.isLoading ? (
        <p className="text-sm text-gray-500">검색 결과를 불러오는 중이에요.</p>
      ) : searchQuery.isError ? (
        <p className="text-sm text-red-600">검색 결과를 불러오지 못했어요.</p>
      ) : (
        <>
          <h2 className="mb-1 text-xl font-bold">‘{query}’ 검색 결과</h2>
          <p className="mb-6 text-sm text-gray-500">
            영화 {searchResults.length}편
          </p>
          {searchResults.length === 0 ? (
            <p className="text-sm text-gray-500">검색 결과가 없어요.</p>
          ) : (
            <ul className="flex flex-col gap-4">
              {searchResults.map((movie) => {
                const posterUrl = getTmdbPosterUrl(movie.poster_path);

                return (
                  <li
                    key={movie.id}
                    className="flex gap-4 rounded-[10px] bg-white p-4"
                  >
                    <div className="relative w-24 shrink-0 sm:w-32">
                      {posterUrl ? (
                        <img
                          src={posterUrl}
                          alt={`${movie.title} 포스터`}
                          className="aspect-[7/8] w-full rounded-md object-cover"
                        />
                      ) : (
                        <div className="flex aspect-[7/8] w-full items-center justify-center rounded-md bg-gray-300 text-xs text-gray-500">
                          이미지 없음
                        </div>
                      )}
                      <BookmarkButton movieId={movie.id} />
                    </div>
                    <div className="flex min-w-0 flex-col gap-1">
                      <h3 className="text-base font-bold">{movie.title}</h3>
                      <p className="text-sm text-gray-500">
                        {movie.original_title}
                      </p>
                      <p className="text-xs text-gray-400">
                        {movie.release_date}
                      </p>
                      <p className="mt-1 text-sm text-gray-700">
                        {movie.overview}
                      </p>
                      <Link
                        to="/movies/$movieId"
                        params={{ movieId: String(movie.id) }}
                        className="mt-auto self-start text-sm font-semibold text-blue-600"
                      >
                        상세 보기
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </>
      )}
    </main>
  );
}
