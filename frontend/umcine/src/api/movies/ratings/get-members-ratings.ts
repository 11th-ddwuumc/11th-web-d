import { umcineClient } from "../../umcine-client";

type GetMembersRatingsResponse = {
  ratingId: number;
  movieId: number;
  score: number;
  comment: string | null;
  createdAt: string;
  updatedAt: string;
};

// 유저별 평점 조회는 로그인 없이 볼 수 있는 API라서 인증 클라이언트가 필요 없어요.
function getMembersRatings(memberId: number) {
  return umcineClient
    .get(`members/${memberId}/ratings`)
    .json<GetMembersRatingsResponse[]>();
}

export { getMembersRatings, type GetMembersRatingsResponse };
