import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { checkNickname } from "../../api/auth/check-nickname";
import WithdrawSection from "./withdraw-section";

// TODO: 내 정보 조회 API 연동 후 초기값 교체
const INITIAL_PROFILE = {
  nickname: "",
  email: "",
};

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

export default function ProfileEditForm() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState(INITIAL_PROFILE.nickname);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isNicknameValid || isSaving) return;

    setIsSaving(true);
    try {
      // TODO: 내 정보 수정 API 연동
      alert("변경사항이 저장되었습니다.");
      navigate({ to: "/profile" });
    } catch {
      alert("저장에 실패했어요. 다시 시도해 주세요.");
    } finally {
      setIsSaving(false);
    }
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
          disabled={!isNicknameValid || isSaving}
          className="h-9 px-4 rounded-lg bg-blue-600 text-xs font-bold text-white cursor-pointer disabled:bg-[#bbb] disabled:cursor-not-allowed shrink-0"
        >
          {isSaving ? "저장 중..." : "변경사항 저장"}
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
              <img
                src={imagePreview}
                alt="프로필 이미지"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <img
                src="/icons/movie-icons/person.svg"
                alt=""
                className="w-8 h-8"
              />
            )}
            <img
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
                onChange={(e) => setNickname(e.target.value)}
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
              value={INITIAL_PROFILE.email}
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
