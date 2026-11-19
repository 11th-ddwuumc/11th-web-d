import { authApi } from "../../auth-api";

export interface PostRatingRequest {
  movieId: number;
  score: number;
  comment: string;
}

type PostRatingResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: number; // 생성된 ratingId
};

function postRating(body: PostRatingRequest) {
  return authApi.post("ratings", { json: body }).json<PostRatingResponse>();
}

export { postRating, type PostRatingResponse };
