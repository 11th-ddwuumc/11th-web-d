import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import { useFavoritesQuery } from "../../hooks/use-favorites-query";
import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image";

// 마이페이지의 내 즐겨찾기 목록 (GET /favorites)
export function FavoriteMovieList() {
  const favoritesQuery = useFavoritesQuery();

  if (favoritesQuery.isPending) {
    return <p className="text-sm text-gray-500">즐겨찾기를 불러오는 중이에요.</p>;
  }

  if (favoritesQuery.isError) {
    return <p className="text-sm text-red-600">즐겨찾기를 불러오지 못했어요.</p>;
  }

  if (favoritesQuery.data.length === 0) {
    return <p className="text-sm text-gray-500">아직 즐겨찾기한 영화가 없어요.</p>;
  }

  return (
    <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4">
      {favoritesQuery.data.map((favorite) => (
        <FavoriteMovieItem key={favorite.favoriteId} movieId={favorite.movieId} />
      ))}
    </ul>
  );
}

function FavoriteMovieItem({ movieId }: { movieId: number }) {
  // 서버는 movieId만 저장하므로 제목과 포스터는 TMDB에서 가져옴
  // 영화 상세 페이지와 같은 query key라 이미 본 영화는 캐시를 재사용함
  const movieDetailQuery = useQuery({
    queryKey: ["movies", "detail", movieId],
    queryFn: () => getMovieDetail(movieId),
    staleTime: 30 * 1000,
  });

  const movie = movieDetailQuery.data;
  const posterUrl = movie ? getTmdbPosterUrl(movie.poster_path) : null;

  return (
    <li>
      <Link
        href={`/movies/${movieId}`}
        className="flex flex-col gap-1.5 text-gray-900 no-underline"
      >
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={`${movie?.title} 포스터`}
            className="aspect-[7/10] w-full rounded-md object-cover"
          />
        ) : (
          <div className="flex aspect-[7/10] w-full items-center justify-center rounded-md bg-gray-200 text-xs text-gray-500">
            {movieDetailQuery.isPending ? "불러오는 중" : "이미지 없음"}
          </div>
        )}
        <p className="truncate text-xs font-semibold">
          {movie?.title ?? `영화 #${movieId}`}
        </p>
      </Link>
    </li>
  );
}
