import { authApi } from "../auth-api";

interface GetFavoriteStatusResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    isFavorite: boolean;
  };
}

// 특정 영화를 즐겨찾기했는지 여부
export async function getFavoriteStatus(movieId: number): Promise<boolean> {
  const response = await authApi
    .get(`favorites/${movieId}`)
    .json<GetFavoriteStatusResponse>();
  return response.result.isFavorite;
}
