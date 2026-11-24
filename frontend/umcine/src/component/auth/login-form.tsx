import { useState, type FormEvent } from "react";
import FormField from "./form-field";
import { useLoginMutation } from "../../hooks/use-login-mutation";

// 이메일 형식 검사
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const DEFAULT_FORM = {
  email: "",
  password: "",
};

type FormKey = keyof typeof DEFAULT_FORM;

export default function LoginForm() {
  const [form, setForm] = useState(DEFAULT_FORM);
  const isEmailValid = EMAIL_REGEX.test(form.email.trim());
  const loginMutation = useLoginMutation();
  const canSubmit = isEmailValid && form.password.length > 0;

  // 입력을 시작한 필드에만 오류 표시
  const emailError =
    form.email && !isEmailValid ? "이메일 형식이 올바르지 않아요" : undefined;

  const handleChangeField = (key: FormKey, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit || loginMutation.isPending) return;

    loginMutation.mutate({
      email: form.email.trim(),
      password: form.password,
    });
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
        disabled={!canSubmit || loginMutation.isPending}
        className="h-11 mt-1 rounded-lg bg-blue-600 text-sm font-bold text-white cursor-pointer disabled:bg-[#bbb] disabled:cursor-not-allowed"
      >
        {loginMutation.isPending ? "로그인 중..." : "로그인"}
      </button>
    </form>
  );
}
