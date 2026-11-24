import { authApi } from "../../auth-api";

type DeleteRatingResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: null;
};

function deleteRating(ratingId: number) {
  return authApi.delete(`ratings/${ratingId}`).json<DeleteRatingResponse>();
}

export { deleteRating, type DeleteRatingResponse };
