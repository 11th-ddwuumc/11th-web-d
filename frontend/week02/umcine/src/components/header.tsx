import "./header.css"

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-logo">
          <img className="header-icon" src="/icons/movie-icons/movie.svg" alt="UMCine 로고" />
          <h1 className="header-title">UMCine</h1>
        </div>
        <nav className="header-nav">
          <span className="active">영화</span>
          <span>검색</span>
          <span>내 정보</span>
        </nav>
        <div className="header-actions">
          <button className="header-search">
            <img src="/icons/movie-icons/search.svg" alt="검색" />
          </button>
          <button className="login-button">로그인</button>
        </div>
      </div>
    </header>
  );
}