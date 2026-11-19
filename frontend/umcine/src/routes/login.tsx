import { createFileRoute, redirect } from "@tanstack/react-router";
import LoginPage from "../pages/auth/login-page";
import { useAuthStore } from "../stores/auth-store";

export const Route = createFileRoute("/login")({
  // 이미 로그인된 사용자는 로그인 페이지 대신 홈으로 이동
  beforeLoad: () => {
    if (useAuthStore.getState().accessToken) {
      throw redirect({ to: "/" });
    }
  },
  component: LoginPage,
});
