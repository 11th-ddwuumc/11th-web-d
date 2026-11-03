import { useState, type FormEvent } from "react";
import FormField from "./form-field";
import { checkEmail } from "../../api/auth/check-email";
import { checkNickname } from "../../api/auth/check-nickname";

const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const passwordError =
    password && !PASSWORD_PATTERN.test(password)
      ? "영문 소문자, 숫자, 특수문자를 모두 포함해 8자 이상 입력해 주세요"
      : undefined;
  const confirmError =
    passwordConfirm && password !== passwordConfirm
      ? "비밀번호가 일치하지 않아요"
      : undefined;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwordError || confirmError) return;
    // TODO: 회원가입 API 연동
  };

  const handleCheckEmail = async () => {
    try {
      const { available } = await checkEmail(email);
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
      const { available } = await checkNickname(nickname);
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

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FormField
        id="email"
        type="email"
        label="이메일"
        placeholder="name@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        actionLabel="중복 확인"
        onAction={handleCheckEmail}
      />
      <FormField
        id="nickname"
        type="text"
        label="닉네임"
        placeholder="2~12자"
        minLength={2}
        maxLength={12}
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
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
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <FormField
        id="password-confirm"
        type="password"
        label="비밀번호 확인"
        placeholder="다시 입력"
        error={confirmError}
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
      />
      <button
        type="submit"
        className="h-11 mt-1 rounded-lg bg-blue-600 text-sm font-bold text-white cursor-pointer"
      >
        가입하기
      </button>
    </form>
  );
}
