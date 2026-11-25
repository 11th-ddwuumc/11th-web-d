import type { Metadata } from "next";
import { Suspense } from "react";
import { MovieDetailPage } from "../../../views/movies/movie-detail-page";

interface MovieDetailRouteProps {
  params: Promise<{ movieId: string }>;
}

export const metadata: Metadata = {
  title: "영화 상세 | UMCine",
};

export default function MovieDetailRoute({ params }: MovieDetailRouteProps) {
  return (
    <Suspense
      fallback={
        <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-8">
          영화 정보를 불러오는 중이에요.
        </main>
      }
    >
      <MovieDetailScreen params={params} />
    </Suspense>
  );
}

// 요청을 받아야 알 수 있는 params를 Suspense 경계 안에서 읽음
async function MovieDetailScreen({ params }: MovieDetailRouteProps) {
  const { movieId } = await params;

  return <MovieDetailPage movieIdParam={movieId} />;
}
