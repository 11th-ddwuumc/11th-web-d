import { useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import FormField from "./form-field";
import { login } from "../../api/auth/login";

// 이메일 형식 검사
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const DEFAULT_FORM = {
  email: "",
  password: "",
};

type FormKey = keyof typeof DEFAULT_FORM;

export default function LoginForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState(DEFAULT_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEmailValid = EMAIL_REGEX.test(form.email.trim());
  const isPasswordValid = form.password.length > 0;
  const canSubmit = isEmailValid && isPasswordValid;

  // 입력을 시작한 필드에만 오류 표시
  const emailError =
    form.email && !isEmailValid ? "이메일 형식이 올바르지 않아요" : undefined;

  const handleChangeField = (key: FormKey, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await login({
        email: form.email.trim(),
        password: form.password,
      });
      // TODO: 토큰 저장 방식 결정 후 처리 (response.result.accessToken)
      console.log(response);
      navigate({ to: "/" });
    } catch {
      alert("로그인에 실패했어요. 이메일과 비밀번호를 확인해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <FormField
        id="email"
        type="email"
        label="이메일"
        placeholder="name@example.com"
        error={emailError}
        value={form.email}
        onChange={(e) => handleChangeField("email", e.target.value)}
      />
      <FormField
        id="password"
        type="password"
        label="비밀번호"
        placeholder="비밀번호 입력"
        value={form.password}
        onChange={(e) => handleChangeField("password", e.target.value)}
      />
      <button
        type="submit"
        disabled={!canSubmit || isSubmitting}
        className="h-11 mt-1 rounded-lg bg-blue-600 text-sm font-bold text-white cursor-pointer disabled:bg-[#bbb] disabled:cursor-not-allowed"
      >
        {isSubmitting ? "로그인 중..." : "로그인"}
      </button>
    </form>
  );
}
