import { useState, type FormEvent } from "react";
import FormField from "./form-field";
import { checkEmail } from "../../api/auth/check-email";
import { checkNickname } from "../../api/auth/check-nickname";
import { signup } from "../../api/auth/signup";

// 이메일 형식 검사
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// 영문 대소문자, 숫자, 특수문자(!@#$%^&*)를 모두 포함해 8자 이상
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

const DEFAULT_FORM = {
  email: "",
  nickname: "",
  password: "",
  passwordConfirm: "",
};

type FormKey = keyof typeof DEFAULT_FORM;

export default function SignupForm() {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const navigate = useNavigate();

  // 입력값의 유효성 검사
  const isEmailValid = EMAIL_REGEX.test(form.email.trim());
  const nicknameLength = form.nickname.trim().length;
  const isNicknameValid = nicknameLength >= 2 && nicknameLength <= 12;
  const isPasswordValid = PASSWORD_REGEX.test(form.password);
  const isPasswordConfirmValid =
    form.passwordConfirm.length > 0 && form.password === form.passwordConfirm;

  // 입력을 시작한 필드에만 오류 표시
  const emailError =
    form.email && !isEmailValid ? "이메일 형식이 올바르지 않아요" : undefined;
  const nicknameError =
    form.nickname && !isNicknameValid
      ? "닉네임은 2~12자로 입력해 주세요"
      : undefined;
  const passwordError =
    form.password && !isPasswordValid
      ? "영문 대 소문자, 숫자, 특수문자(!@#$%^&*)를 모두 포함해 8자 이상 입력해 주세요"
      : undefined;
  const confirmError =
    form.passwordConfirm && !isPasswordConfirmValid
      ? "비밀번호가 일치하지 않아요"
      : undefined;

  // 모든 입력값이 유효하면 제출 버튼 활성화
  const canSubmit =
    isEmailValid &&
    isNicknameValid &&
    isPasswordValid &&
    isPasswordConfirmValid;

  const handleChangeField = (key: FormKey, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // 폼 제출 시 페이지 새로고침 방지
    e.preventDefault();
    if (!canSubmit || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await signup({
        email: form.email.trim(),
        nickname: form.nickname.trim(),
        password: form.password,
      });
      alert(response.message);
      // 로그인 페이지 연결 후 주석 해제
      // navigate({ to: "/login" });
    } catch {
      alert("회원가입에 실패했어요. 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCheckEmail = async () => {
    try {
      const { available } = await checkEmail(form.email);
      if (available) {
        alert("사용 가능한 이메일입니다.");
      } else {
        alert("이미 사용 중인 이메일입니다.");
      }
    } catch (error) {
      console.error(error);
      alert("이메일 확인 중 오류가 발생했습니다.");
    }
  };

  const handleCheckNickname = async () => {
    try {
      const { available } = await checkNickname(form.nickname);
      if (available) {
        alert("사용 가능한 닉네임입니다.");
      } else {
        alert("이미 사용 중인 닉네임입니다.");
      }
    } catch (error) {
      console.error(error);
      alert("닉네임 확인 중 오류가 발생했습니다.");
    }
  };

  // noValidate: 브라우저 기본 유효성 검사를 끄고 직접 검사한 결과만 사용
  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-4"
    >
      <FormField
        id="email"
        type="email"
        label="이메일"
        placeholder="name@example.com"
        error={emailError}
        value={form.email}
        onChange={(e) => handleChangeField("email", e.target.value)}
        actionLabel="중복 확인"
        onAction={handleCheckEmail}
      />
      <FormField
        id="nickname"
        type="text"
        label="닉네임"
        placeholder="2~12자"
        maxLength={12}
        error={nicknameError}
        value={form.nickname}
        onChange={(e) => handleChangeField("nickname", e.target.value)}
        actionLabel="중복 확인"
        onAction={handleCheckNickname}
      />
      <FormField
        id="password"
        type="password"
        label="비밀번호"
        placeholder="8자 이상"
        hint="영문 대 소문자, 숫자, 특수문자를 모두 포함해 8자 이상 입력해 주세요"
        error={passwordError}
        value={form.password}
        onChange={(e) => handleChangeField("password", e.target.value)}
      />
      <FormField
        id="password-confirm"
        type="password"
        label="비밀번호 확인"
        placeholder="다시 입력"
        error={confirmError}
        value={form.passwordConfirm}
        onChange={(e) => handleChangeField("passwordConfirm", e.target.value)}
      />
      <button
        type="submit"
        disabled={!canSubmit || isSubmitting}
        className="h-11 mt-1 rounded-lg bg-blue-600 text-sm font-bold text-white cursor-pointer disabled:bg-[#bbb] disabled:cursor-not-allowed"
      >
        {isSubmitting ? "가입 중..." : "가입하기"}
      </button>
    </form>
  );
}
