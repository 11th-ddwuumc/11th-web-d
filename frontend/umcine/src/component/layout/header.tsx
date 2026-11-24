import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../api/members/me";
import { useAuthStore } from "../../stores/auth-store";

const MENU_ITEMS = ["영화", "검색", "내 정보"];

export default function Header() {
    const accessToken = useAuthStore((state) => state.accessToken);
    const meQuery = useQuery({
        queryKey: ["members", "me"],
        queryFn: getMe,
        enabled: Boolean(accessToken),
        staleTime: 5 * 60 * 1000,
        retry: false,
    });

  return (
    <header className="flex items-baseline gap-1 sm:gap-2 px-4 sm:px-6 md:px-10 lg:px-[88px] pt-3 pb-3 w-full font-bold bg-white fixed top-0 z-10">
        <div className="self-center w-7 h-7 sm:w-8 sm:h-8 rounded-[20%] border-[3px] border-black flex items-center justify-center shrink-0">
            <img className="w-5 h-5 sm:w-6 sm:h-6" src="/icons/movie-icons/movie.svg" alt="영화 아이콘" />
        </div>
        <h1 className="text-base sm:text-xl md:text-2xl text-[#111] whitespace-nowrap shrink-0">UMCine</h1>

        <div className="flex items-baseline gap-2 sm:gap-4 ml-2 sm:ml-4 md:ml-8">
            {MENU_ITEMS.map((item) => {
                const menuClassName = "cursor-pointer text-xs sm:text-sm md:text-base text-[#555] border-b-2 border-transparent whitespace-nowrap pb-0.5 data-[status=active]:text-black data-[status=active]:border-black";

                if (item === "영화") {
                    return (
                        <Link
                            key={item}
                            to="/"
                            className={menuClassName}
                            activeOptions={{ exact: true }}
                        >
                            영화
                        </Link>
                    );
                }
                if (item === "검색") {
                    return (
                        <Link key={item} to="/search" className={menuClassName}>
                            검색
                        </Link>
                    );
                }
                return (
                    <Link key={item} to="/profile" className={menuClassName}>
                        {item}
                    </Link>
                );
            })}
        </div>

        <div className="ml-auto self-center flex items-center gap-2 sm:gap-4">
            <div className="self-center w-7 h-7 sm:w-8 sm:h-8 rounded-[20%] border border-[#ddd] flex items-center justify-center shrink-0">
                <img className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer" src="/icons/movie-icons/search.svg" alt="검색 아이콘" />
            </div>
            {!accessToken ? (
                <Link
                    to="/login"
                    className="h-7 sm:h-8 px-2.5 sm:px-4 inline-flex items-center text-xs sm:text-sm font-semibold rounded-lg bg-blue-600 text-white cursor-pointer whitespace-nowrap shrink-0"
                >
                    로그인
                </Link>
            ) : meQuery.isLoading ? (
                <span className="h-7 sm:h-8 w-20 animate-pulse rounded-lg bg-gray-200" />
            ) : (
                <Link
                    to="/profile"
                    className="h-7 sm:h-8 px-2.5 sm:px-4 inline-flex items-center text-xs sm:text-sm font-semibold rounded-lg bg-blue-600 text-white cursor-pointer whitespace-nowrap shrink-0"
                >
                    마이페이지
                </Link>
            )}
        </div>
    </header>
    );
}