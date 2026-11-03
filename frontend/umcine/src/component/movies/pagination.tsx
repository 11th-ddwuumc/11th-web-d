import { cn } from "../../utils/cn";

const PAGE_GROUP_SIZE = 5;

interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null;

    // 5개씩 묶어서 보여줘요. (1~5, 6~10, ...) 전체가 5페이지 이하면 있는 만큼만 보여줘요.
    const groupStart = Math.floor((page - 1) / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE + 1;
    const groupEnd = Math.min(groupStart + PAGE_GROUP_SIZE - 1, totalPages);
    const pages = Array.from({ length: groupEnd - groupStart + 1 }, (_, index) => groupStart + index);

    const arrowClassName =
        "w-8 h-8 flex items-center justify-center rounded-lg enabled:cursor-pointer enabled:hover:bg-gray-200 disabled:opacity-30";

    return (
        <nav aria-label="페이지 이동" className="flex items-center justify-center gap-2 mt-6">
            <button
                type="button"
                aria-label="이전 페이지"
                className={arrowClassName}
                disabled={page <= 1}
                onClick={() => onPageChange(page - 1)}
            >
                <img className="w-5 h-5" src="/icons/movie-icons/chevron-left.svg" alt="" />
            </button>

            {pages.map((pageNumber) => (
                <button
                    key={pageNumber}
                    type="button"
                    aria-current={pageNumber === page ? "page" : undefined}
                    className={cn(
                        "w-8 h-8 rounded-lg text-sm font-semibold cursor-pointer",
                        pageNumber === page
                            ? "bg-[#111] text-white"
                            : "text-gray-500 hover:bg-gray-200",
                    )}
                    onClick={() => onPageChange(pageNumber)}
                >
                    {pageNumber}
                </button>
            ))}

            <button
                type="button"
                aria-label="다음 페이지"
                className={arrowClassName}
                disabled={page >= totalPages}
                onClick={() => onPageChange(page + 1)}
            >
                <img className="w-5 h-5" src="/icons/movie-icons/chevron-right.svg" alt="" />
            </button>
        </nav>
    );
}
