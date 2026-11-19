import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HTTPError } from "ky";
import { postRating } from "../api/movies/ratings/post-ratings";
import { patchRating } from "../api/movies/ratings/update-ratings";
import { deleteRating } from "../api/movies/ratings/delete-ratings";
import { ratingQueries } from "../api/movies/ratings/rating-queries";

// 서버가 내려준 메시지가 있으면 그대로 보여주고, 없으면 기본 문구를 써요.
async function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof HTTPError) {
    try {
      const body = (await error.response.clone().json()) as { message?: string };
      if (body.message) return body.message;
    } catch {
      // 본문이 JSON이 아니면 기본 문구를 써요.
    }
  }
  return fallback;
}

function useInvalidateRatings() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ratingQueries.all() });
}

export function useCreateRatingMutation() {
  const invalidateRatings = useInvalidateRatings();

  return useMutation({
    mutationFn: postRating,
    onSuccess: invalidateRatings,
    onError: async (error) => {
      alert(await getErrorMessage(error, "평점 등록에 실패했어요."));
    },
  });
}

export function useUpdateRatingMutation() {
  const invalidateRatings = useInvalidateRatings();

  return useMutation({
    mutationFn: ({
      ratingId,
      score,
      comment,
    }: {
      ratingId: number;
      score: number;
      comment: string;
    }) => patchRating(ratingId, { score, comment }),
    onSuccess: invalidateRatings,
    onError: async (error) => {
      alert(await getErrorMessage(error, "평점 수정에 실패했어요."));
    },
  });
}

export function useDeleteRatingMutation() {
  const invalidateRatings = useInvalidateRatings();

  return useMutation({
    mutationFn: deleteRating,
    onSuccess: invalidateRatings,
    onError: async (error) => {
      alert(await getErrorMessage(error, "평점 삭제에 실패했어요."));
    },
  });
}
