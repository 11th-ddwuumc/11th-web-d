import { cn } from "../../utils/cn";

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (nextPage: number) => void;
};

const PAGE_GROUP_SIZE = 5;

export default function Pagination({
  page: currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  // 현재 페이지가 속한 묶음의 시작/끝 번호 (예: 7페이지면 6~10)
  const groupStart =
    Math.floor((currentPage - 1) / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE + 1;
  const groupEnd = Math.min(groupStart + PAGE_GROUP_SIZE - 1, totalPages);

  const pages = Array.from(
    { length: groupEnd - groupStart + 1 },
    (_, i) => groupStart + i,
  );

  return (
    <nav
      className="mt-10 flex items-center justify-center gap-2 pb-6"
      aria-label="영화 목록 페이지"
    >
      <button
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E2E5EA] bg-white disabled:cursor-not-allowed disabled:opacity-40"
        type="button"
        aria-label="이전 페이지"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <img
          className="h-4 w-4 rotate-180"
          src="/icons/movie-icons/arrow-right.svg"
          alt=""
        />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={cn(
            "flex h-9 min-w-9 items-center justify-center rounded-lg border px-3 text-sm font-semibold",
            page === currentPage
              ? "border-[#17191E] bg-[#17191E] text-white"
              : "border-[#E2E5EA] bg-white text-[#687182]",
          )}
          type="button"
          aria-label={`${page}페이지`}
          aria-current={page === currentPage ? "page" : undefined}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E2E5EA] bg-white disabled:cursor-not-allowed disabled:opacity-40"
        type="button"
        aria-label="다음 페이지"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <img
          className="h-4 w-4"
          src="/icons/movie-icons/arrow-right.svg"
          alt=""
        />
      </button>
    </nav>
  );
}