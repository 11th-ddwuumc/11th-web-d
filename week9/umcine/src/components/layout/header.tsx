"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { useMeQuery } from "../../hooks/use-me-query";
import { useAuthHydrated, useAuthStore } from "../../stores/auth-store";
import { cn } from "../../utils/cn";

const navLinkClassName = "text-[13px] text-gray-700 no-underline";
const activeNavLinkClassName =
  "font-bold text-gray-900 underline underline-offset-[6px]";
const headerButtonClassName =
  "flex h-9 items-center rounded-md bg-blue-600 px-3.5 text-[13px] font-semibold text-white no-underline";

const navItems = [
  { href: "/", label: "영화", exact: true },
  { href: "/search", label: "검색", exact: false },
  { href: "/my", label: "내 정보", exact: false },
];

export function Header() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const isAuthHydrated = useAuthHydrated();
  const meQuery = useMeQuery();

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex min-h-16 max-w-7xl flex-col items-start justify-between gap-3 px-4 py-3 sm:flex-row sm:items-center sm:px-6 sm:py-0">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-lg font-bold text-gray-900 no-underline"
          >
            <img src="/icons/movie.svg" alt="" className="size-6" />
            <span>UMCine</span>
          </Link>
          {/* usePathname은 동적 경로(/movies/[movieId])에서 요청 전에는 값을 알 수 없어
              Suspense 경계 안에 둠. 준비되기 전에는 강조 없는 링크를 보여 줌 */}
          <Suspense fallback={<HeaderNav pathname={null} />}>
            <HeaderNavWithPathname />
          </Suspense>
        </div>
        <div className="flex w-full items-center justify-end gap-2 sm:w-auto">
          <Link
            href="/search"
            aria-label="검색"
            className="flex size-9 items-center justify-center rounded-md border border-gray-200 bg-white"
          >
            <img src="/icons/search.svg" alt="" className="size-4" />
          </Link>
          {/* 저장된 토큰 확인 전 / 첫 조회 중: 로딩 표시, 로그인 전: 로그인 링크, 토큰 있음: 마이페이지 링크 */}
          {!isAuthHydrated || (accessToken && meQuery.isLoading) ? (
            <span className="h-9 w-24 animate-pulse rounded-md bg-gray-200" />
          ) : !accessToken ? (
            <Link href="/login" className={headerButtonClassName}>
              로그인
            </Link>
          ) : (
            <Link href="/my" className={headerButtonClassName}>
              마이페이지
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

function HeaderNavWithPathname() {
  const pathname = usePathname();
  return <HeaderNav pathname={pathname} />;
}

function HeaderNav({ pathname }: { pathname: string | null }) {
  return (
    <nav className="flex gap-4">
      {navItems.map(({ href, label, exact }) => {
        const isActive =
          pathname !== null &&
          (exact ? pathname === href : pathname.startsWith(href));

        return (
          <Link
            key={href}
            href={href}
            className={cn(navLinkClassName, isActive && activeNavLinkClassName)}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
