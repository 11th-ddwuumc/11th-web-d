import { cn } from "../../utils/cn";

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
}

const pages = [1, 2, 3, 4, 5];

export function Pagination({ currentPage, onPageChange }: PaginationProps) {
  return (
    <nav className="mt-10 flex items-center justify-center gap-2">
      <button
        type="button"
        className={cn(
          "flex size-8 items-center justify-center rounded-md",
          currentPage === 1 ? "cursor-default opacity-30" : "cursor-pointer",
        )}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <img src="/icons/chevron-left.svg" alt="이전 페이지" className="size-4" />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          className={cn(
            "flex size-8 cursor-pointer items-center justify-center rounded-md text-[13px]",
            page === currentPage
              ? "bg-gray-900 font-bold text-white"
              : "text-gray-700",
          )}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        className={cn(
          "flex size-8 items-center justify-center rounded-md",
          currentPage === pages.length
            ? "cursor-default opacity-30"
            : "cursor-pointer",
        )}
        disabled={currentPage === pages.length}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <img src="/icons/chevron-right.svg" alt="다음 페이지" className="size-4" />
      </button>
    </nav>
  );
}
