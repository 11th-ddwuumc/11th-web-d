import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { HTTPError } from "ky";
import { favoriteQueries } from "../api/movies/favorites/favorite-queries";
import { postFavorite } from "../api/movies/favorites/post-favorites";
import { deleteFavorite } from "../api/movies/favorites/delete-favorites";
import { useAuthStore } from "../stores/auth-store";

// 내 즐겨찾기 목록. 원본은 서버이고, 로그인했을 때만 요청해요.
export function useFavoritesQuery() {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    ...favoriteQueries.list(),
    enabled: Boolean(accessToken),
  });
}

// 영화 카드처럼 여러 개가 한 화면에 있을 때는 목록 하나로 즐겨찾기 여부를 판단해요.
export function useIsFavorite(movieId: number) {
  const favoritesQuery = useFavoritesQuery();
  return (
    favoritesQuery.data?.some((favorite) => favorite.movieId === movieId) ?? false
  );
}

// 상세 화면처럼 영화 한 편만 볼 때는 GET /favorites/{movieId}로 조회해요.
export function useFavoriteStatusQuery(movieId: number, enabled = true) {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    ...favoriteQueries.status(movieId),
    enabled: enabled && Boolean(accessToken),
  });
}

async function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof HTTPError) {
    try {
      const body = (await error.response.clone().json()) as { message?: string };
      if (body.message) return body.message;
    } catch {
      // 본문이 JSON이 아니면 기본 문구를 써요.
    }
  }
  return fallback;
}

// 즐겨찾기 추가/해제. 로그인하지 않았다면 로그인 페이지로 보내요.
export function useToggleFavorite() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const accessToken = useAuthStore((state) => state.accessToken);

  const mutation = useMutation({
    mutationFn: async ({
      movieId,
      isFavorite,
    }: {
      movieId: number;
      isFavorite: boolean;
    }) => {
      if (isFavorite) await deleteFavorite(movieId);
      else await postFavorite(movieId);
    },
    // 목록과 영화별 여부가 모두 서버 값으로 다시 맞춰져요.
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: favoriteQueries.all() }),
    onError: async (error) => {
      alert(await getErrorMessage(error, "즐겨찾기 처리에 실패했어요."));
    },
  });

  function toggleFavorite(movieId: number, isFavorite: boolean) {
    if (!accessToken) {
      alert("즐겨찾기는 로그인 후 이용할 수 있어요.");
      navigate({ to: "/login" });
      return;
    }
    if (mutation.isPending) return;
    mutation.mutate({ movieId, isFavorite });
  }

  return { toggleFavorite, isPending: mutation.isPending };
}
