import { authApi } from "../../auth-api";

type GetFavoriteStatusResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    isFavorite: boolean;
  };
};

// GET /favorites/{movieId}: 이 영화를 내가 즐겨찾기했는지 조회해요.
function getFavoriteStatus(movieId: number) {
  return authApi
    .get(`favorites/${movieId}`)
    .json<GetFavoriteStatusResponse>();
}

export { getFavoriteStatus, type GetFavoriteStatusResponse };
