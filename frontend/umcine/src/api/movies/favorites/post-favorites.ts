import { authApi } from "../../auth-api";
import type { FavoriteItem } from "./get-my-favorites";

type PostFavoriteResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: FavoriteItem;
};

// POST /favorites
function postFavorite(movieId: number) {
  return authApi
    .post("favorites", { json: { movieId } })
    .json<PostFavoriteResponse>();
}

export { postFavorite, type PostFavoriteResponse };
