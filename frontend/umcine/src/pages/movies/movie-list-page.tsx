import { useRef, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import MovieGrid from "../../component/movies/movie-grid";
import MovieGridSkeleton from "../../component/movies/movie-grid-skeleton";
import Pagination from "../../component/movies/pagination";
import Footer from "../../component/layout/footer";
import { movieQueries } from "../../api/movies/movie-queries";
import { useGridColumns } from "../../hooks/use-grid-columns";

// 한 페이지에는 두 줄까지만 보여줘요. (5열이면 10개, 3열이면 6개)
const ROWS_PER_PAGE = 2;

export function MovieListPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const columns = useGridColumns(containerRef);
  const pageSize = (columns ?? 0) * ROWS_PER_PAGE;

  // 화면 너비가 바뀌어 열 수가 달라져도 보고 있던 영화가 그대로 보이도록, 페이지 번호 대신 첫 영화의 순번을 저장해요.
  const [offset, setOffset] = useState(0);
  const startIndex = pageSize > 0 ? Math.floor(offset / pageSize) * pageSize : 0;
  const page = pageSize > 0 ? startIndex / pageSize + 1 : 1;

  const moviesQuery = useQuery({
    ...movieQueries.list({ startIndex, pageSize }),
    enabled: pageSize > 0,
    placeholderData: keepPreviousData, // 페이지를 넘길 때 이전 목록을 유지해서 화면이 깜빡이지 않아요.
  });

  const movies = moviesQuery.data?.movies ?? [];
  const totalPages = pageSize > 0 ? Math.ceil((moviesQuery.data?.totalResults ?? 0) / pageSize) : 0;

  const handlePageChange = (nextPage: number) => {
    setOffset((nextPage - 1) * pageSize);
  };

  return (
    <div ref={containerRef}>
      {/* 열 수를 재기 전에는 아무것도 그리지 않아요. */}
      {columns === null ? null : moviesQuery.isPending ? (
        <MovieGridSkeleton columns={columns} count={pageSize} />
      ) : moviesQuery.isError ? (
        <p>{moviesQuery.error.message}</p>
      ) : movies.length === 0 ? (
        <p>표시할 영화가 없어요.</p>
      ) : (
        <div>
          <h1 className="pt-6 mb-4 text-left text-2xl font-bold">
            영화 목록
          </h1>
          <MovieGrid movies={movies} columns={columns} />
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
          <Footer />
        </div>
      )}
    </div>
  );
}
