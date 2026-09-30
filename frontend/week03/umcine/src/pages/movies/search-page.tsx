import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Route } from "../../routes/search";
import { movies } from "../../data/movies";
import { cn } from "../../utils/cn";

export function SearchPage() {
  const { query } = Route.useSearch();
  const navigate = useNavigate({ from: "/search" });

  const [searchText, setSearchText] = useState(query ?? "");

  useEffect(() => {
    setSearchText(query ?? "");
  }, [query]);

  const normalizedQuery = query?.trim().toLowerCase() ?? "";
  const hasQuery = normalizedQuery.length > 0;

  const searchResults = hasQuery
    ? movies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(normalizedQuery) ||
          movie.originalTitle.toLowerCase().includes(normalizedQuery),
      )
    : [];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextQuery = searchText.trim();

    void navigate({
      to: "/search",
      search: nextQuery ? { query: nextQuery } : {},
    });
  }

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#F5F6F8] font-['Pretendard',sans-serif] text-[#17191E]">
      <div
        className={cn(
          "mx-auto max-w-[1280px] px-4 sm:px-8 lg:px-20",
          hasQuery ? "py-6" : "pt-28 sm:pt-44",
        )}
      >
        <h1
          className={cn(
            "font-extrabold",
            hasQuery
              ? "mb-4 text-[28px]"
              : "mb-8 text-center text-[28px] sm:text-[36px]",
          )}
        >
          {hasQuery ? "영화 검색" : "어떤 영화를 찾고 있나요?"}
        </h1>

        <form
          onSubmit={handleSubmit}
          className={cn(
            "flex items-center gap-3 rounded-lg bg-white px-4 py-3",
            hasQuery
              ? "border border-[#E2E5EA]"
              : "mx-auto max-w-[700px] border-2 border-[#34373C] shadow-lg",
          )}
        >
          <svg
            className="h-5 w-5 shrink-0 text-[#687182]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="m16 16 4.5 4.5" />
          </svg>

          <input
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#969DA8]"
            type="search"
            aria-label="영화 검색어"
            placeholder="예: 스파이더맨"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />

          <button
            className="shrink-0 rounded-md bg-[#17191E] px-4 py-2 text-sm font-bold text-white hover:bg-[#34373C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            type="submit"
          >
            {hasQuery ? "다시 검색" : "검색"}
          </button>
        </form>

        {!hasQuery ? (
          <p className="mt-4 text-center text-sm text-[#687182]">
            검색어를 입력해 주세요.
          </p>
        ) : (
          <section className="mt-5" aria-labelledby="search-results-title">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2E5EA] pb-3">
              <h2
                id="search-results-title"
                className="break-words text-sm font-bold"
              >
                '{query?.trim()}' 검색 결과
              </h2>

              <p className="text-xs text-[#687182]">
                영화 {searchResults.length}편
              </p>
            </div>

            {searchResults.length === 0 ? (
              <p className="py-16 text-center text-[#687182]">
                검색 결과가 없어요.
              </p>
            ) : (
              <ul className="m-0 grid list-none grid-cols-1 gap-x-8 p-0 lg:grid-cols-2">
                {searchResults.map((movie) => (
                  <li
                    key={movie.id}
                    className="flex min-w-0 gap-4 border-b border-[#E2E5EA] py-5"
                  >
                    <Link
                      className="shrink-0"
                      to="/movies/$movieId"
                      params={{ movieId: String(movie.id) }}
                      aria-label={`${movie.title} 상세 보기`}
                    >
                      <img
                        className="h-[150px] w-[100px] rounded-lg object-cover sm:h-[180px] sm:w-[120px]"
                        src={movie.posterPath}
                        alt={`${movie.title} 포스터`}
                        loading="lazy"
                      />
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col">
                      <h3 className="text-base font-bold">
                        <Link
                          className="break-words text-inherit no-underline hover:underline"
                          to="/movies/$movieId"
                          params={{ movieId: String(movie.id) }}
                        >
                          {movie.title}
                        </Link>
                      </h3>

                      <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1 text-xs text-[#687182]">
                        <p>{movie.originalTitle}</p>
                        <p>{movie.releaseDate}</p>
                      </div>

                      <p className="mt-3 break-words text-xs leading-relaxed text-[#687182]">
                        {movie.overview}
                      </p>

                      <Link
                        className="mt-auto self-start pt-4 text-xs font-semibold text-[#2563EB] no-underline hover:underline"
                        to="/movies/$movieId"
                        params={{ movieId: String(movie.id) }}
                      >
                        상세 보기 →
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
