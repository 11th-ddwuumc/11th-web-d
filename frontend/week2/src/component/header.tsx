import "./header.css";

export const MENU_ITEMS = ["영화", "검색", "내 정보"];

type HeaderProps = {
  activeMenu: string;
  onMenuChange: (menu: string) => void;
};

export default function Header({ activeMenu, onMenuChange }: HeaderProps) {
  return (
    <header className="header">
        <div className="logo">
            <img className="header-icon" src="/icons/movie-icons/movie.svg" alt="영화 아이콘" />
        </div>
        <h1 className="header-title">UMCine</h1>

        <div className="header-menu">
            {MENU_ITEMS.map((item) => (
                <p
                    key={item}
                    className={`header-menu-item${item === activeMenu ? " active" : ""}`}
                    onClick={() => onMenuChange(item)}
                >
                    {item}
                </p>
            ))}
        </div>

        <div className="header-actions">
            <div className="search-box">
                <img className="header-search-icon" src="/icons/movie-icons/search.svg" alt="검색 아이콘" />
            </div>
            <button className="header-login-button">로그인</button>
        </div>
    </header>
    );
}