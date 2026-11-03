import { queryOptions } from "@tanstack/react-query";
import { getMovieDetail } from "./get-movie-detail";
import { getMovies } from "./get-movies";
import { searchMovies } from "./search-movies";

// TMDB는 한 페이지에 20개씩 내려줘요.
const TMDB_PAGE_SIZE = 20;
// TMDB는 500페이지까지만 조회할 수 있어요.
const TMDB_MAX_PAGES = 500;

const movieQueries = {
  all: () => ["movies"] as const,

  // TMDB 인기 영화 한 페이지(20개)
  tmdbList: (page: number) =>
    queryOptions({
      queryKey: [...movieQueries.all(), "tmdb-list", { page }] as const,
      queryFn: () => getMovies({ page }),
    }),

  // 화면에 보여줄 구간(startIndex부터 pageSize개)의 영화 목록
  list: ({ startIndex, pageSize }: { startIndex: number; pageSize: number }) =>
    queryOptions({
      queryKey: [...movieQueries.all(), "list", { startIndex, pageSize }] as const,
      queryFn: async ({ client }) => {
        // 한 구간이 TMDB 두 페이지에 걸칠 수 있어서 필요한 TMDB 페이지를 모두 가져와요.
        const firstTmdbPage = Math.floor(startIndex / TMDB_PAGE_SIZE) + 1;
        const lastTmdbPage = Math.floor((startIndex + pageSize - 1) / TMDB_PAGE_SIZE) + 1;
        const responses = await Promise.all(
          Array.from({ length: lastTmdbPage - firstTmdbPage + 1 }, (_, index) =>
            client.ensureQueryData(movieQueries.tmdbList(firstTmdbPage + index)),
          ),
        );

        const sliceStart = startIndex - (firstTmdbPage - 1) * TMDB_PAGE_SIZE;
        return {
          movies: responses
            .flatMap((response) => response.results)
            .slice(sliceStart, sliceStart + pageSize),
          totalResults: Math.min(responses[0].total_results, TMDB_MAX_PAGES * TMDB_PAGE_SIZE),
        };
      },
    }),

  search: (query: string) =>
    queryOptions({
      queryKey: [...movieQueries.all(), "search", { query }] as const,
      queryFn: () => searchMovies({ query }),
      enabled: query !== "",
    }),

  detail: (movieId: number) =>
    queryOptions({
      queryKey: [...movieQueries.all(), "detail", movieId] as const,
      queryFn: () => getMovieDetail(movieId),
      staleTime: 30 * 1000, // 30초 동안 캐시 유지
    }),
};

export { movieQueries };
