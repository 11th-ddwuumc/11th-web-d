import { authApi } from "../../auth-api";

type DeleteFavoriteResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: null;
};

// DELETE /favorites/{movieId}
function deleteFavorite(movieId: number) {
  return authApi
    .delete(`favorites/${movieId}`)
    .json<DeleteFavoriteResponse>();
}

export { deleteFavorite, type DeleteFavoriteResponse };
