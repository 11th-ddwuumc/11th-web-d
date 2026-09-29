import "./pagination.css"
export default function Pagination() {
  return (
    <nav className="pagination">
      <button className="page-arrow page-arrow-left" aria-label="이전 페이지">
        <img src="/icons/movie-icons/arrow-right.svg" alt="" />
      </button>
      <button className="page-number active">1</button>
      <button className="page-arrow" aria-label="다음 페이지">
        <img src="/icons/movie-icons/arrow-right.svg" alt="" />
      </button>
    </nav>
  );
}