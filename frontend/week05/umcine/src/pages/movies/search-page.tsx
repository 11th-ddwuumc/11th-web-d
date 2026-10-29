import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Route } from "../../routes/search";
import { searchMovies } from "../../api/movies/search-movies";
import type { TmdbMovieListItem } from "../../api/movies/models";
import { cn } from "../../utils/cn";
import { BookmarkButton } from "../../components/bookmark-button";

export function SearchPage() {
  const { query } = Route.useSearch();
  const navigate = useNavigate({ from: "/search" });

  const [searchText, setSearchText] = useState(query ?? "");
  const [movies, setMovies] = useState<TmdbMovieListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setSearchText(query ?? "");
  }, [query]);

  const normalizedQuery = (query ?? "").trim();
  const hasQuery = normalizedQuery.length > 0;

  useEffect(() => {
    let ignore = false;

    setMovies([]);
    setErrorMessage(null);

    if (!normalizedQuery) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    searchMovies({ query: normalizedQuery })
      .then((response) => {
        if (!ignore) setMovies(response.results);
      })
      .catch(() => {
        if (!ignore) setErrorMessage("검색 결과를 불러오지 못했어요.");
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [normalizedQuery]);

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
                '{normalizedQuery}' 검색 결과
              </h2>

              <p className="text-xs text-[#687182]">영화 {movies.length}편</p>
            </div>

            {isLoading ? (
              <p className="py-16 text-center text-[#687182]">검색 중...</p>
            ) : errorMessage ? (
              <p className="py-16 text-center text-[#687182]">{errorMessage}</p>
            ) : movies.length === 0 ? (
              <p className="py-16 text-center text-[#687182]">
                검색 결과가 없어요.
              </p>
            ) : (
              <ul className="m-0 grid list-none grid-cols-1 gap-x-8 p-0 lg:grid-cols-2">
                {movies.map((movie) => (
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
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : undefined
                        }
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
                        <p>{movie.original_title}</p>
                        <p>{movie.release_date}</p>
                      </div>

                      <p className="mt-3 break-words text-xs leading-relaxed text-[#687182]">
                        {movie.overview}
                      </p>

                      <div className="mt-auto flex items-center gap-4 pt-4">
                        <Link
                          className="text-xs font-semibold text-[#2563EB] no-underline hover:underline"
                          to="/movies/$movieId"
                          params={{ movieId: String(movie.id) }}
                        >
                          상세 보기 →
                        </Link>

                        <BookmarkButton movieId={movie.id} />
                      </div>
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