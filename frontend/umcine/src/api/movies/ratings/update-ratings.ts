import { authApi } from "../../auth-api";

export interface PatchRatingRequest {
  score: number;
  comment: string;
}

type PatchRatingResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    ratingId: number;
    movieId: number;
    score: number;
    comment: string | null;
    createdAt: string;
    updatedAt: string;
  };
};

function patchRating(ratingId: number, body: PatchRatingRequest) {
  return authApi
    .patch(`ratings/${ratingId}`, { json: body })
    .json<PatchRatingResponse>();
}

export { patchRating, type PatchRatingResponse };
