"use client";

import Image from "next/image";
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { checkNickname } from "../../api/auth/check-nickname";
import { getMe } from "../../api/members/me";
import { useUpdateMeMutation } from "../../hooks/use-update-me-mutation";
import { useAuthStore } from "../../stores/auth-store";
import WithdrawSection from "./withdraw-section";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

export default function ProfileEditForm() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const meQuery = useQuery({
    queryKey: ["members", "me"],
    queryFn: getMe,
    enabled: Boolean(accessToken),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  // 사용자가 입력하기 전에는 조회한 닉네임을 보여 줌
  const [nicknameInput, setNicknameInput] = useState<string | null>(null);
  const nickname = nicknameInput ?? meQuery.data?.nickname ?? "";
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const updateMeMutation = useUpdateMeMutation();

  const nicknameLength = nickname.trim().length;
  const isNicknameValid = nicknameLength >= 2 && nicknameLength <= 12;
  const nicknameError =
    nickname && !isNicknameValid ? "닉네임은 2~12자로 입력해 주세요" : undefined;

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_IMAGE_SIZE) {
      alert("5MB 이하의 이미지만 선택할 수 있어요.");
      return;
    }
    setImagePreview(URL.createObjectURL(file));
    // TODO: 이미지 업로드 API 연동
  };

  const handleCheckNickname = async () => {
    try {
      const { available } = await checkNickname(nickname);
      alert(
        available ? "사용 가능한 닉네임입니다." : "이미 사용 중인 닉네임입니다.",
      );
    } catch (error) {
      console.error(error);
      alert("닉네임 확인 중 오류가 발생했습니다.");
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isNicknameValid || updateMeMutation.isPending) return;

    updateMeMutation.mutate({ nickname: nickname.trim() });
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-8 flex-1"
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#111]">
            내 정보 수정
          </h2>
          <p className="mt-1 text-xs text-[#777]">
            닉네임과 프로필 이미지만 변경할 수 있어요.
          </p>
        </div>
        <button
          type="submit"
          disabled={!isNicknameValid || updateMeMutation.isPending}
          className="h-9 px-4 rounded-lg bg-blue-600 text-xs font-bold text-white cursor-pointer disabled:bg-[#bbb] disabled:cursor-not-allowed shrink-0"
        >
          {updateMeMutation.isPending ? "저장 중..." : "변경사항 저장"}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8 md:gap-16">
        <div className="flex flex-col items-center gap-1 md:w-1/3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="relative w-20 h-20 rounded-full bg-[#e5e7eb] flex items-center justify-center cursor-pointer"
            aria-label="프로필 이미지 변경"
          >
            {imagePreview ? (
              // 선택한 파일의 미리보기(blob/data URL)라서 최적화 없이 그대로 보여줘요.
              <Image
                src={imagePreview}
                alt="프로필 이미지"
                width={96}
                height={96}
                unoptimized
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <Image width={24} height={24}
                src="/icons/movie-icons/person.svg"
                alt=""
                className="w-8 h-8"
              />
            )}
            <Image width={24} height={24}
              src="/icons/movie-icons/edit.svg"
              alt=""
              className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-white"
            />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          <p className="text-xs font-bold text-[#111] mt-1">프로필 이미지</p>
          <p className="text-[10px] text-[#999]">선택 사항 · 5MB 이하</p>
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="nickname" className="text-xs font-bold text-[#111]">
              닉네임
            </label>
            <div
              className={`flex items-center h-11 px-3 rounded-lg border bg-white ${
                nicknameError ? "border-red-500" : "border-[#e5e7eb]"
              }`}
            >
              <input
                id="nickname"
                type="text"
                maxLength={12}
                value={nickname}
                onChange={(e) => setNicknameInput(e.target.value)}
                className="flex-1 min-w-0 text-sm text-[#111] outline-none bg-transparent"
              />
              <button
                type="button"
                onClick={handleCheckNickname}
                className="ml-2 shrink-0 text-[11px] font-bold text-blue-600 cursor-pointer"
              >
                중복 확인
              </button>
            </div>
            {nicknameError && (
              <p className="text-[11px] text-red-500">{nicknameError}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-xs font-bold text-[#111]">
              이메일
            </label>
            <input
              id="email"
              type="email"
              value={meQuery.data?.email ?? ""}
              readOnly
              className="h-11 px-3 rounded-lg border border-[#e5e7eb] bg-white text-sm text-[#777] outline-none"
            />
          </div>
        </div>
      </div>

      <WithdrawSection />
    </form>
  );
}
