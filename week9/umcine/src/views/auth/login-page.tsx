"use client";

import Link from "next/link";
import { useState, type SubmitEvent } from "react";
import { useLoginMutation } from "../../hooks/use-login-mutation";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const DEFAULT_FORM = {
  email: "",
  password: "",
};

type DefaultFormKey = keyof typeof DEFAULT_FORM;

const labelClassName = "text-[13px] font-semibold text-gray-700";
const inputClassName =
  "h-10 w-full rounded-md border border-gray-200 bg-white pr-3 pl-9 text-sm outline-none focus:border-blue-600";
const inputIconClassName =
  "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2";

export function LoginPage() {
  const [form, setForm] = useState(DEFAULT_FORM);

  const loginMutation = useLoginMutation();

  // 이메일 형식이 맞고 비밀번호를 입력해야 로그인 버튼 활성화
  const canSubmit =
    EMAIL_REGEX.test(form.email.trim()) && form.password.length > 0;

  const handleChangeField = (key: DefaultFormKey, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit || loginMutation.isPending) return;

    loginMutation.mutate({
      email: form.email.trim(),
      password: form.password,
    });
  };

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-12">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex w-full max-w-sm flex-col gap-4"
      >
        <h1 className="mb-2 text-2xl font-bold">로그인</h1>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className={labelClassName}>
            이메일
          </label>
          <div className="relative">
            <img src="/icons/mail.svg" alt="" className={inputIconClassName} />
            <input
              id="email"
              type="email"
              placeholder="example@umc.com"
              value={form.email}
              onChange={(e) => handleChangeField("email", e.target.value)}
              className={inputClassName}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className={labelClassName}>
            비밀번호
          </label>
          <div className="relative">
            <img src="/icons/lock.svg" alt="" className={inputIconClassName} />
            <input
              id="password"
              type="password"
              placeholder="비밀번호"
              value={form.password}
              onChange={(e) => handleChangeField("password", e.target.value)}
              className={inputClassName}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!canSubmit || loginMutation.isPending}
          className="mt-2 h-10 cursor-pointer rounded-md bg-blue-600 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-blue-300"
        >
          {loginMutation.isPending ? "로그인 중" : "로그인"}
        </button>

        <p className="text-center text-xs text-gray-500">
          아직 계정이 없으신가요?{" "}
          <Link href="/signup" className="font-semibold text-blue-600">
            회원가입
          </Link>
        </p>
      </form>
    </main>
  );
}
