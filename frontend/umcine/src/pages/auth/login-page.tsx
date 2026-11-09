import LoginForm from "../../component/auth/login-form";
import SignupForm from "../../component/auth/signup-form";

export default function LoginPage() {
  return (
    <section className="w-full max-w-[360px] mx-auto pt-36 flex flex-col gap-5">
      <h2 className="text-2xl sm:text-3xl font-bold text-[#111]">로그인</h2>
      <LoginForm />
      <p className="text-center text-[11px] text-[#555]">
        아직 계정이 없으신가요?{" "}
        <a href="/signup" className="font-bold text-blue-600">
          회원가입
        </a>
      </p>
    </section>
  );
}
