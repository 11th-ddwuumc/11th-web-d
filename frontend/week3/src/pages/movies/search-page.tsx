import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState, type SubmitEvent } from "react";
import { movies } from "../../data/movie";

export function SearchPage() {
  const { query } = useSearch({ from: "/search" });
  const navigate = useNavigate({ from: "/search" });
  const [searchText, setSearchText] = useState(query ?? "");
  const [attemptedEmptySearch, setAttemptedEmptySearch] = useState(false);

  useEffect(() => {
    setSearchText(query ?? "");
  }, [query]);

  const normalizedQuery = query?.trim().toLowerCase() ?? "";
  const searchResults = normalizedQuery
    ? movies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(normalizedQuery) ||
          movie.originalTitle.toLowerCase().includes(normalizedQuery),
      )
    : [];

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextQuery = searchText.trim();
    if (!nextQuery) {
      setAttemptedEmptySearch(true);
      navigate({ search: {} });
      return;
    }
    setAttemptedEmptySearch(false);
    navigate({ search: { query: nextQuery } });
  }

  function handleSearchTextChange(value: string) {
    setSearchText(value);
    if (attemptedEmptySearch) {
      setAttemptedEmptySearch(false);
    }
  }

  return (
    <main className="pt-6 flex flex-col">
      {normalizedQuery ? (
        <section className="flex w-full flex-col gap-6 py-8">
          <h1 className="text-2xl font-bold text-[#111]">영화 검색</h1>
          <form onSubmit={handleSubmit} className="flex w-full items-center gap-3">
            <div className="relative flex-1">
              <img
                src="/icons/movie-icons/search.svg"
                alt=""
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-40"
              />
              <input
                className="h-12 w-full rounded-xl border-2 border-gray-300 bg-white pl-9 pr-9 text-sm text-[#111] placeholder:text-gray-400 focus:border-black focus:outline-none"
                aria-label="검색어"
                placeholder="예: 스파이더맨"
                value={searchText}
                onChange={(event) => handleSearchTextChange(event.target.value)}
              />
              {searchText && (
                <button
                  type="button"
                  aria-label="검색어 지우기"
                  onClick={() => handleSearchTextChange("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 hover:cursor-pointer"
                >
                  <img
                    src="/icons/movie-icons/close.svg"
                    alt=""
                    className="h-4 w-4 opacity-40"
                  />
                </button>
              )}
            </div>
            <button
              className="h-12 shrink-0 rounded-xl bg-black px-5 text-sm font-semibold text-white hover:cursor-pointer hover:bg-gray-700"
              type="submit"
            >
              다시 검색
            </button>
          </form>
        </section>
      ) : (
        <section className="mx-auto flex w-full max-w-2xl flex-col items-center gap-6 px-10 pt-24">
          <h1 className="text-3xl font-bold text-[#111]">어떤 영화를 찾고 있나요?</h1>
          <form onSubmit={handleSubmit} className="flex w-full items-center gap-3">
            <div className="relative flex-1">
              <img
                src="/icons/movie-icons/search.svg"
                alt=""
                className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 opacity-40"
              />
              <input
                className="h-14 w-full rounded-xl border-2 border-gray-300 bg-white pl-9 pr-4 text-sm text-[#111] placeholder:text-gray-400 focus:border-black focus:outline-none"
                aria-label="검색어"
                placeholder="예: 스파이더맨"
                value={searchText}
                onChange={(event) => handleSearchTextChange(event.target.value)}
              />
              <button
                className="absolute right-2 top-2 h-10 shrink-0 rounded-lg bg-black px-4 text-sm font-semibold text-white hover:cursor-pointer hover:bg-gray-700"
                type="submit"
              >
              검색
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="mt-4 flex-1">
        {!normalizedQuery ? (
          attemptedEmptySearch ? (
            <p className="py-10 text-center text-sm text-gray-400">검색어를 입력해 주세요.</p>
          ) : null
        ) : (
          <>
            <div className="flex items-baseline justify-between border-b border-gray-300 pb-4">
              <h2 className="text-lg font-bold text-[#111]">‘{query}’ 검색 결과</h2>
              <p className="text-xs text-gray-400">
                영화 {searchResults.length}편 · 1페이지
              </p>
            </div>
            {searchResults.length === 0 ? (
              <p className="py-10 text-center text-sm text-gray-400">검색 결과가 없어요.</p>
            ) : (
              <ul className="grid grid-cols-1 gap-x-10 gap-y-6 pt-6 lg:grid-cols-2">
                {searchResults.map((movie) => (
                  <li
                    key={movie.id}
                    className="flex gap-4 border-b border-gray-300 pb-6"
                  >
                    <img
                      src={movie.posterPath}
                      alt={`${movie.title} 포스터`}
                      className="h-[200px] w-[144px] shrink-0 rounded-lg object-cover"
                    />
                    <div className="flex flex-col gap-1">
                      <h3 className="text-base font-bold text-[#111]">{movie.title}</h3>
                      <p className="text-xs text-gray-400">
                        {movie.originalTitle} · {movie.releaseDate}
                      </p>
                      <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                        {movie.overview}
                      </p>
                      <Link
                        to="/movies/$movieId"
                        params={{ movieId: String(movie.id) }}
                        className="mt-5 text-sm font-bold text-blue-600 hover:text-blue-300"
                      >
                        상세 보기 →
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </section>
    </main>
  );
}