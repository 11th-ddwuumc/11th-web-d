export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-left">
          <a href="#" className="header-logo">
            <img src="/icons/movie.svg" alt="" />
            <span>UMCine</span>
          </a>
          <nav className="header-nav">
            <a href="#" className="header-nav-link header-nav-link-active">영화</a>
            <a href="#" className="header-nav-link">검색</a>
            <a href="#" className="header-nav-link">내 정보</a>
          </nav>
        </div>
        <div className="header-right">
          <button type="button" className="header-search-button" aria-label="검색">
            <img src="/icons/search.svg" alt="" />
          </button>
          <button type="button" className="header-login-button">로그인</button>
        </div>
      </div>
    </header>
  );
}