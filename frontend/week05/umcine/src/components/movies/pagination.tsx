import { cn } from "../../utils/cn";

export default function Pagination() {
  const currentPage = 1;
  const pages = [1];

  return (
    <nav
      className="mt-10 flex items-center justify-center gap-2 pb-6"
      aria-label="영화 목록 페이지"
    >
      <button
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E2E5EA] bg-white disabled:cursor-not-allowed disabled:opacity-40"
        type="button"
        aria-label="이전 페이지"
        disabled
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
        >
          {page}
        </button>
      ))}

      <button
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E2E5EA] bg-white disabled:cursor-not-allowed disabled:opacity-40"
        type="button"
        aria-label="다음 페이지"
        disabled
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
