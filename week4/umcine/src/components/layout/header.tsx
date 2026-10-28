import { Link } from "@tanstack/react-router";

const navLinkClassName = "text-[13px] text-gray-700 no-underline";
const activeNavLinkClassName =
  "font-bold text-gray-900 underline underline-offset-[6px]";

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex min-h-16 max-w-7xl flex-col items-start justify-between gap-3 px-4 py-3 sm:flex-row sm:items-center sm:px-6 sm:py-0">
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-lg font-bold text-gray-900 no-underline"
          >
            <img src="/icons/movie.svg" alt="" className="size-6" />
            <span>UMCine</span>
          </Link>
          <nav className="flex gap-4">
            <Link
              to="/"
              className={navLinkClassName}
              activeOptions={{ exact: true }}
              activeProps={{ className: activeNavLinkClassName }}
            >
              영화
            </Link>
            <Link
              to="/search"
              className={navLinkClassName}
              activeProps={{ className: activeNavLinkClassName }}
            >
              검색
            </Link>
            <span className={navLinkClassName}>내 정보</span>
          </nav>
        </div>
        <div className="flex w-full items-center justify-end gap-2 sm:w-auto">
          <Link
            to="/search"
            aria-label="검색"
            className="flex size-9 items-center justify-center rounded-md border border-gray-200 bg-white"
          >
            <img src="/icons/search.svg" alt="" className="size-4" />
          </Link>
          <button
            type="button"
            className="h-9 cursor-pointer rounded-md bg-blue-600 px-3.5 text-[13px] font-semibold text-white"
          >
            로그인
          </button>
        </div>
      </div>
    </header>
  );
}
