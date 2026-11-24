import { authApi } from "../../auth-api";

type FavoriteItem = {
  favoriteId: number;
  movieId: number;
  createdAt: string;
};

type GetMyFavoritesResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: FavoriteItem[];
};

// GET /favorites: 내 즐겨찾기 목록이에요. 목록 화면에서 카드마다 요청하지 않도록 한 번에 가져와요.
function getMyFavorites() {
  return authApi.get("favorites").json<GetMyFavoritesResponse>();
}

export { getMyFavorites, type FavoriteItem, type GetMyFavoritesResponse };
