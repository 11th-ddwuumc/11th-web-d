import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";

import { useState } from "react";
import { getMovies } from "../../api/movies/get-movies";
import { useQuery } from "@tanstack/react-query";

export function MovieListPage() {
  const [page, setPage] = useState(1);

  const moviesQuery = useQuery({
    queryKey: ["movies", "list", { page }],
    queryFn: () => getMovies({ page }),
  });

  const movies = moviesQuery.data?.results ?? [];
  const totalPages = moviesQuery.data?.total_pages ?? 0;

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
  };

    return (
    <main className="mx-auto max-w-[1280px] px-4 py-6 sm:px-8 lg:px-20">
      <h2 className="mb-5 font-['Pretendard',sans-serif] text-[20px] font-extrabold">
        영화 목록
      </h2>

      {/* 데이터를 가져오는 중인지, 오류가 발생했는지 순서대로 확인해요. */}
      {moviesQuery.isPending ? (
        <p className="py-16 text-center text-[#687182]">불러오는 중...</p>
      ) : moviesQuery.isError ? (
        <p className="py-16 text-center text-[#687182]">
          {moviesQuery.error.message}
        </p>
      ) : movies.length === 0 ? (
        <p className="py-16 text-center text-[#687182]">
          표시할 영화가 없어요.
        </p>
      ) : (
        <>
          {/* movies로 영화 목록을 표시해요. */}
          <MovieGrid movies={movies} />
          {/* totalPages로 전체 페이지 수를 확인하고, 페이지 번호를 클릭하면 handlePageChange를 호출해요. */}
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </main>
  );
}