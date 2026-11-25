"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../stores/auth-store";
import { useMeQuery } from "../../hooks/use-me-query";
import { ratingQueries } from "../../api/movies/ratings/rating-queries";
import type { GetMembersRatingsResponse } from "../../api/movies/ratings/get-members-ratings";
import {
  useCreateRatingMutation,
  useDeleteRatingMutation,
  useUpdateRatingMutation,
} from "../../hooks/use-rating-mutations";

export default function RatingSection({ movieId }: { movieId: number }) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const meQuery = useMeQuery();
  const memberId = meQuery.data?.memberId;

  const ratingsQuery = useQuery({
    ...ratingQueries.memberList(memberId ?? 0),
    enabled: memberId !== undefined,
  });

  const header = (
    <>
      <h2 className="mb-1 text-lg font-bold text-[#111]">내 평점</h2>
      <p className="mb-3 text-xs text-gray-400">별점은 필수, 후기는 선택이에요.</p>
    </>
  );

  if (!accessToken) {
    return (
      <div className="w-full lg:w-[280px] lg:shrink-0">
        {header}
        <p className="text-sm text-gray-500">
          평점을 남기려면{" "}
          <Link href="/login" className="font-bold text-blue-600 hover:text-blue-300">
            로그인
          </Link>
          이 필요해요.
        </p>
      </div>
    );
  }

  // 내 정보 요청이 끝났는데 memberId가 없으면(서버 응답에 빠진 경우) 계속 로딩하지 않고 알려줘요.
  if (meQuery.isError || (meQuery.isSuccess && memberId === undefined)) {
    return (
      <div className="w-full lg:w-[280px] lg:shrink-0">
        {header}
        <p className="text-sm text-red-500">내 정보를 불러오지 못했어요.</p>
      </div>
    );
  }

  if (memberId === undefined || ratingsQuery.isPending) {
    return (
      <div className="w-full lg:w-[280px] lg:shrink-0">
        {header}
        <p className="text-sm text-gray-400">불러오는 중...</p>
      </div>
    );
  }

  if (ratingsQuery.isError) {
    return (
      <div className="w-full lg:w-[280px] lg:shrink-0">
        {header}
        <p className="text-sm text-red-500">평점을 불러오지 못했어요.</p>
      </div>
    );
  }

  const myRating = ratingsQuery.data.find((rating) => rating.movieId === movieId);

  return (
    <div className="w-full lg:w-[280px] lg:shrink-0">
      {header}
      {/* 서버의 평점이 바뀌면(등록/삭제) 폼 입력값도 새로 시작하도록 key로 초기화해요. */}
      <RatingForm
        key={myRating?.ratingId ?? "new"}
        movieId={movieId}
        myRating={myRating}
      />
    </div>
  );
}

function RatingForm({
  movieId,
  myRating,
}: {
  movieId: number;
  myRating: GetMembersRatingsResponse | undefined;
}) {
  const [rating, setRating] = useState(myRating?.score ?? 0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState(myRating?.comment ?? "");
  const [isSaved, setIsSaved] = useState(false);

  const createMutation = useCreateRatingMutation();
  const updateMutation = useUpdateRatingMutation();
  const deleteMutation = useDeleteRatingMutation();
  const isBusy =
    createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

  function handleSave() {
    if (rating === 0 || isBusy) return;

    if (myRating) {
      updateMutation.mutate(
        { ratingId: myRating.ratingId, score: rating, comment: review },
        { onSuccess: () => setIsSaved(true) },
      );
    } else {
      createMutation.mutate(
        { movieId, score: rating, comment: review },
        { onSuccess: () => setIsSaved(true) },
      );
    }
  }

  function handleDelete() {
    if (!myRating || isBusy) return;
    if (!confirm("평점을 삭제할까요?")) return;
    deleteMutation.mutate(myRating.ratingId);
  }

  return (
    <>
      <div className="mb-4 flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            aria-label={`${star}점`}
            onClick={() => {
              setRating(star);
              setIsSaved(false);
            }}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="hover:cursor-pointer"
          >
            <Image width={24} height={24}
              src={
                star <= (hoverRating || rating)
                  ? "/icons/movie-icons/star.svg"
                  : "/icons/movie-icons/star-outline.svg"
              }
              alt=""
              className="h-6 w-6"
            />
          </button>
        ))}
      </div>
      <textarea
        value={review}
        maxLength={500}
        onChange={(event) => {
          setReview(event.target.value);
          setIsSaved(false);
        }}
        placeholder="영화를 보고 느낀 점을 남겨주세요."
        className="mb-4 h-24 w-full resize-none rounded-lg border border-gray-200 p-3 text-sm text-[#111] placeholder:text-gray-400 focus:border-black focus:outline-none"
      />
      <button
        type="button"
        onClick={handleSave}
        disabled={rating === 0 || isBusy}
        className="w-full rounded-lg bg-black py-2.5 text-sm font-semibold text-white hover:cursor-pointer hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        {myRating ? "평점 수정" : "평점 저장"}
      </button>
      {myRating && (
        <button
          type="button"
          onClick={handleDelete}
          disabled={isBusy}
          className="mt-2 w-full rounded-lg border border-gray-300 py-2.5 text-sm font-semibold text-gray-700 hover:cursor-pointer hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-300"
        >
          평점 삭제
        </button>
      )}
      {isSaved && (
        <p className="mt-2 text-center text-xs text-gray-400">평점이 저장되었어요.</p>
      )}
    </>
  );
}
