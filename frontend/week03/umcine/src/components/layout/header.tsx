import { Link } from "@tanstack/react-router";

export default function Header() {
  return (
    <header className="border-b border-[#E2E5EA] bg-white font-['Pretendard',sans-serif] text-[#17191E]">
      <div className="mx-auto flex min-h-20 max-w-[1280px] flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-8 lg:px-20">
        <div className="flex items-center gap-6 sm:gap-10">
          <Link
            className="flex shrink-0 items-center gap-2 text-inherit no-underline"
            to="/"
            aria-label="UMCine 홈"
          >
            <img
              className="h-7 w-7"
              src="/icons/movie-icons/movie.svg"
              alt=""
            />

            <span className="text-xl font-extrabold">
              UMCine
            </span>
          </Link>

          <nav
            className="flex items-center gap-4 text-sm font-semibold sm:gap-6"
            aria-label="주 메뉴"
          >
            <Link
              className="text-[#687182] no-underline hover:text-[#17191E]"
              activeProps={{
                className: "text-[#17191E]",
                "aria-current": "page",
              }}
              activeOptions={{ exact: true }}
              to="/"
            >
              영화
            </Link>

            <Link
              className="text-[#687182] no-underline hover:text-[#17191E]"
              activeProps={{
                className: "text-[#17191E]",
                "aria-current": "page",
              }}
              to="/search"
              search={{}}
            >
              검색
            </Link>

            <span className="hidden text-[#969DA8] sm:inline">
              내 정보
            </span>
          </nav>
        </div>

        <div className="ml-auto flex items-center gap-3 sm:gap-5">
          <Link
            className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-[#F5F6F8]"
            to="/search"
            search={{}}
            aria-label="영화 검색"
          >
            <img
              className="h-5 w-5"
              src="/icons/movie-icons/search.svg"
              alt=""
            />
          </Link>

          <button
            className="rounded-lg bg-[#17191E] px-4 py-2 text-sm font-bold text-white hover:bg-[#34373C]"
            type="button"
          >
            로그인
          </button>
        </div>
      </div>
    </header>
  );
}
