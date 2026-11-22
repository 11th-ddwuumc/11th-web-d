import { Link } from "@tanstack/react-router";
import { useState, type SubmitEvent } from "react";
import type { Rating } from "../../api/ratings/get-member-ratings";
import { useMeQuery } from "../../hooks/use-me-query";
import { useMyRatingsQuery } from "../../hooks/use-my-ratings-query";
import {
  useCreateRatingMutation,
  useDeleteRatingMutation,
  useUpdateRatingMutation,
} from "../../hooks/use-rating-mutations";
import { useAuthStore } from "../../stores/auth-store";
import { cn } from "../../utils/cn";

const SCORES = [1, 2, 3, 4, 5];
const COMMENT_MAX_LENGTH = 500;

const sectionClassName =
  "mt-8 flex max-w-xl flex-col gap-3 rounded-[10px] bg-white/10 p-5";

interface MyRatingSectionProps {
  movieId: number;
}

export function MyRatingSection({ movieId }: MyRatingSectionProps) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const meQuery = useMeQuery();
  // 내 정보에서 memberId를 얻은 뒤 GET /members/{memberId}/ratings 요청
  const ratingsQuery = useMyRatingsQuery(meQuery.data?.memberId);

  if (!accessToken) {
    return (
      <section className={sectionClassName}>
        <h2 className="text-lg font-bold">내 평점</h2>
        <p className="text-sm text-white/70">
          평점을 남기려면{" "}
          <Link to="/login" className="font-semibold text-blue-300">
            로그인
          </Link>
          해 주세요.
        </p>
      </section>
    );
  }

  if (meQuery.isPending || ratingsQuery.isPending) {
    return (
      <section className={sectionClassName}>
        <h2 className="text-lg font-bold">내 평점</h2>
        <p className="text-sm text-white/70">내 평점을 불러오는 중이에요.</p>
      </section>
    );
  }

  if (meQuery.isError || ratingsQuery.isError) {
    return (
      <section className={sectionClassName}>
        <h2 className="text-lg font-bold">내 평점</h2>
        <p className="text-sm text-white/70">내 평점을 불러오지 못했어요.</p>
      </section>
    );
  }

  // 내 평점 목록 중 이 영화에 남긴 평점
  const myRating = ratingsQuery.data.find(
    (rating) => rating.movieId === movieId,
  );

  // 등록·삭제 후 myRating이 바뀌면 key가 바뀌어 폼 입력값이 새로 채워짐
  return (
    <MyRatingForm
      key={myRating?.ratingId ?? "new"}
      movieId={movieId}
      myRating={myRating}
    />
  );
}

interface MyRatingFormProps {
  movieId: number;
  myRating: Rating | undefined;
}

function MyRatingForm({ movieId, myRating }: MyRatingFormProps) {
  const [score, setScore] = useState(myRating?.score ?? 0);
  const [comment, setComment] = useState(myRating?.comment ?? "");

  const createRatingMutation = useCreateRatingMutation();
  const updateRatingMutation = useUpdateRatingMutation();
  const deleteRatingMutation = useDeleteRatingMutation();

  const isPending =
    createRatingMutation.isPending ||
    updateRatingMutation.isPending ||
    deleteRatingMutation.isPending;

  const isScoreValid = score >= 1 && score <= 5;
  const isChanged =
    !myRating ||
    score !== myRating.score ||
    comment.trim() !== (myRating.comment ?? "");
  const canSubmit = isScoreValid && isChanged;

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit || isPending) return;

    if (myRating) {
      updateRatingMutation.mutate({
        ratingId: myRating.ratingId,
        score,
        comment: comment.trim(),
      });
    } else {
      createRatingMutation.mutate({ movieId, score, comment: comment.trim() });
    }
  };

  const handleDelete = () => {
    if (!myRating || isPending) return;
    if (!confirm("이 영화에 남긴 평점을 삭제할까요?")) return;

    deleteRatingMutation.mutate(myRating.ratingId);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className={sectionClassName}>
      <h2 className="text-lg font-bold">내 평점</h2>

      <div className="flex gap-1" role="radiogroup" aria-label="별점">
        {SCORES.map((value) => (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={score === value}
            aria-label={`${value}점`}
            onClick={() => setScore(value)}
            className={cn(
              "cursor-pointer text-2xl leading-none",
              value <= score ? "text-yellow-400" : "text-white/30",
            )}
          >
            ★
          </button>
        ))}
        <span className="ml-2 self-center text-sm text-white/70">
          {isScoreValid ? `${score}점` : "별점을 선택해 주세요"}
        </span>
      </div>

      <textarea
        aria-label="한줄평"
        value={comment}
        maxLength={COMMENT_MAX_LENGTH}
        onChange={(e) => setComment(e.target.value)}
        placeholder="한줄평을 남겨 주세요 (선택)"
        rows={3}
        className="w-full resize-none rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-white/40 focus:border-blue-400"
      />
      <p className="text-right text-xs text-white/50">
        {comment.length}/{COMMENT_MAX_LENGTH}
      </p>

      <div className="flex gap-2">
        {myRating && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="h-10 flex-1 cursor-pointer rounded-md border border-white/30 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {deleteRatingMutation.isPending ? "삭제 중" : "삭제"}
          </button>
        )}
        <button
          type="submit"
          disabled={!canSubmit || isPending}
          className="h-10 flex-1 cursor-pointer rounded-md bg-blue-600 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-blue-600/40"
        >
          {myRating
            ? updateRatingMutation.isPending
              ? "수정 중"
              : "수정"
            : createRatingMutation.isPending
              ? "등록 중"
              : "등록"}
        </button>
      </div>
    </form>
  );
}
