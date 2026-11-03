import SignupForm from "../../component/auth/signup-form";

export default function SignupPage() {
  return (
    <section className="w-full max-w-[360px] mx-auto pt-16 sm:pt-24 flex flex-col gap-5">
      <h2 className="text-2xl sm:text-3xl font-bold text-[#111]">회원가입</h2>
      <SignupForm />
      <p className="text-center text-[11px] text-[#555]">
        이미 계정이 있나요?{" "}
        <a href="/login" className="font-bold text-blue-600">
          로그인
        </a>
      </p>
    </section>
  );
}
