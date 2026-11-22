import { useQuery } from "@tanstack/react-query";
import { getFavoriteStatus } from "../api/favorites/get-favorite-status";
import { useAuthStore } from "../stores/auth-store";

// 영화 상세에서 이 영화를 즐겨찾기했는지 조회
// key가 ["favorites", ...]로 시작하므로 ["favorites"]를 무효화하면 함께 다시 조회됨
export function useFavoriteStatusQuery(movieId: number) {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: ["favorites", movieId],
    queryFn: () => getFavoriteStatus(movieId),
    enabled: Boolean(accessToken) && Number.isInteger(movieId) && movieId > 0,
    retry: false,
  });
}
