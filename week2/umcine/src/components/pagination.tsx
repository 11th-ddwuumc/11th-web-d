interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
}

const pages = [1, 2, 3, 4, 5];

/**
 * 1~5 페이지 선택 버튼을 렌더링하고 선택한 페이지 번호를 콜백으로 전달합니다.
 * 현재 페이지를 강조하며 영화 목록을 직접 변경하지는 않습니다.
 */
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
