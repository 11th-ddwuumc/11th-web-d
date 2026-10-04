interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
}

const pages = [1, 2, 3, 4, 5];

export default function Pagination({ currentPage, onPageChange }: PaginationProps) {
  return (
    <nav className="pagination">
      <button
        className="pagination-arrow"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <img src="/icons/chevron-left.svg" alt="이전 페이지" />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={page === currentPage ? "pagination-page active" : "pagination-page"}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className="pagination-arrow"
        disabled={currentPage === pages.length}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <img src="/icons/chevron-right.svg" alt="다음 페이지" />
      </button>
    </nav>
  );
}
