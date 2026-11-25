"use client";

import Link from "next/link";
import { useState, type SubmitEvent } from "react";
import type { MemberInfo } from "../../api/members/me";
import { useMeQuery } from "../../hooks/use-me-query";
import { useUpdateMeMutation } from "../../hooks/use-update-me-mutation";
import { cn } from "../../utils/cn";

const labelClassName = "text-[13px] font-semibold text-gray-700";
const inputClassName =
  "h-10 w-full rounded-md border border-gray-200 bg-white px-3 text-sm outline-none focus:border-blue-600 disabled:bg-gray-100 disabled:text-gray-500";

export function MyEditPage() {
  const meQuery = useMeQuery();

  if (meQuery.isPending) {
    return (
      <main className="mx-auto w-full max-w-xl flex-1 px-4 pt-8 pb-12">
        내 정보를 불러오는 중이에요.
      </main>
    );
  }

  if (meQuery.isError) {
    return (
      <main className="mx-auto w-full max-w-xl flex-1 px-4 pt-8 pb-12">
        내 정보를 불러오지 못했어요. 다시 로그인해 주세요.
      </main>
    );
  }

  // 조회가 끝난 뒤에 폼을 그려야 닉네임 입력칸의 초기값을 서버 값으로 채울 수 있음
  return <MyEditForm member={meQuery.data} />;
}

function MyEditForm({ member }: { member: MemberInfo }) {
  const [nickname, setNickname] = useState(member.nickname);
  const updateMeMutation = useUpdateMeMutation();

  const trimmedNickname = nickname.trim();
  const isNicknameValid =
    trimmedNickname.length >= 2 && trimmedNickname.length <= 12;
  // 저장에 성공하면 setQueryData로 member가 바뀌므로 저장 버튼이 다시 비활성화됨
  const isChanged = trimmedNickname !== member.nickname;
  const showNicknameError = nickname.length > 0 && !isNicknameValid;

  // 닉네임이 바뀌었고 조건을 만족할 때만 저장 버튼 활성화
  const canSubmit = isNicknameValid && isChanged;

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit || updateMeMutation.isPending) return;

    updateMeMutation.mutate({ nickname: trimmedNickname });
  };

  return (
    <main className="mx-auto w-full max-w-xl flex-1 px-4 pt-8 pb-12">
      <h1 className="mb-6 text-2xl font-bold">내 정보 수정</h1>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col gap-4 rounded-[10px] bg-white p-6"
      >
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className={labelClassName}>
            이메일
          </label>
          <input
            id="email"
            type="email"
            value={member.email}
            disabled
            className={inputClassName}
          />
          <p className="text-xs text-gray-500">이메일은 변경할 수 없어요.</p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="nickname" className={labelClassName}>
            닉네임
          </label>
          <input
            id="nickname"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className={cn(
              inputClassName,
              showNicknameError && "border-red-500 focus:border-red-500",
            )}
          />
          {showNicknameError && (
            <p className="text-xs text-red-600">
              닉네임은 2자 이상 12자 이하로 입력해 주세요.
            </p>
          )}
        </div>

        <div className="mt-2 flex gap-2">
          <Link
            href="/my"
            className="flex h-10 flex-1 items-center justify-center rounded-md border border-gray-200 text-sm font-semibold text-gray-700"
          >
            취소
          </Link>
          <button
            type="submit"
            disabled={!canSubmit || updateMeMutation.isPending}
            className="h-10 flex-1 cursor-pointer rounded-md bg-blue-600 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            {updateMeMutation.isPending ? "저장 중" : "저장"}
          </button>
        </div>
      </form>
    </main>
  );
}
