import { Link } from "@tanstack/react-router";
import { useMeQuery } from "../../hooks/use-me-query";
import { useAuthStore } from "../../stores/auth-store";

const navLinkClassName = "text-[13px] text-gray-700 no-underline";
const activeNavLinkClassName =
  "font-bold text-gray-900 underline underline-offset-[6px]";
const headerButtonClassName =
  "flex h-9 items-center rounded-md bg-blue-600 px-3.5 text-[13px] font-semibold text-white no-underline";

export function Header() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const meQuery = useMeQuery();

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
            <Link
              to="/my"
              className={navLinkClassName}
              activeProps={{ className: activeNavLinkClassName }}
            >
              내 정보
            </Link>
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
          {/* 로그인 전: 로그인 링크, 첫 조회 중: 로딩 표시, 토큰 있음: 마이페이지 링크 */}
          {!accessToken ? (
            <Link to="/login" className={headerButtonClassName}>
              로그인
            </Link>
          ) : meQuery.isLoading ? (
            <span className="h-9 w-24 animate-pulse rounded-md bg-gray-200" />
          ) : (
            <Link to="/my" className={headerButtonClassName}>
              마이페이지
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
