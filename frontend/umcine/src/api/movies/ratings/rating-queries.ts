import { queryOptions } from "@tanstack/react-query";
import { getMembersRatings } from "./get-members-ratings";

const ratingQueries = {
  all: () => ["ratings"] as const,

  // 특정 회원이 남긴 평점 목록
  memberList: (memberId: number) =>
    queryOptions({
      queryKey: [...ratingQueries.all(), "member", memberId] as const,
      queryFn: () => getMembersRatings(memberId),
    }),
};

export { ratingQueries };
