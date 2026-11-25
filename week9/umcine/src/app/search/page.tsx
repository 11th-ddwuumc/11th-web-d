import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchPage } from "../../views/movies/search-page";

interface SearchRouteProps {
  searchParams: Promise<{ query?: string | string[] }>;
}

export const metadata: Metadata = {
  title: "영화 검색 | UMCine",
};

export default function SearchRoute({ searchParams }: SearchRouteProps) {
  return (
    <Suspense
      fallback={
        <main className="mx-auto w-full max-w-7xl flex-1 px-6 pt-8 pb-12">
          검색 화면을 준비하는 중이에요.
        </main>
      }
    >
      <SearchScreen searchParams={searchParams} />
    </Suspense>
  );
}

async function SearchScreen({ searchParams }: SearchRouteProps) {
  const { query } = await searchParams;
  const searchQuery = typeof query === "string" ? query : "";

  // key가 바뀌면 SearchPage를 새로 만들어 입력창(searchText)도 새 검색어로 초기화됨
  return <SearchPage key={searchQuery} query={searchQuery} />;
}
