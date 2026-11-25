import { useQuery } from "@tanstack/react-query";
import { getFavorites } from "../api/favorites/get-favorites";
import { useAuthStore } from "../stores/auth-store";

// 내 즐겨찾기 목록. 영화 카드 여러 개가 같은 key를 쓰므로 요청은 한 번만 감
export function useFavoritesQuery() {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
    enabled: Boolean(accessToken),
    retry: false,
  });
}
