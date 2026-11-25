import { useQuery } from "@tanstack/react-query";
import { getMemberRatings } from "../api/ratings/get-member-ratings";

// 내 평점 목록. 내 정보 조회가 끝나 memberId를 알게 된 뒤에만 요청함
export function useMyRatingsQuery(memberId: number | undefined) {
  return useQuery({
    queryKey: ["ratings", "member", memberId],
    queryFn: () => getMemberRatings(memberId!),
    enabled: memberId !== undefined,
  });
}
