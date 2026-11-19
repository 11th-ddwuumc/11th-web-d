import { queryOptions } from "@tanstack/react-query";
import { getFavoriteStatus } from "./get-favorite-status";
import { getMyFavorites } from "./get-my-favorites";

const favoriteQueries = {
  all: () => ["favorites"] as const,

  // 내 즐겨찾기 목록(영화 id 배열)
  list: () =>
    queryOptions({
      queryKey: [...favoriteQueries.all(), "list"] as const,
      queryFn: async () => (await getMyFavorites()).result,
    }),

  // 영화 한 편의 즐겨찾기 여부
  status: (movieId: number) =>
    queryOptions({
      queryKey: [...favoriteQueries.all(), "status", movieId] as const,
      queryFn: async () => (await getFavoriteStatus(movieId)).result.isFavorite,
    }),
};

export { favoriteQueries };
