import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useAuthStore } from "../../stores/auth-store";

// (auth) 폴더 안의 페이지(마이페이지, 내 정보 수정)가 공통으로 쓰는 Layout Route
// 폴더 이름의 괄호는 주소에 포함되지 않음 → /my, /my/edit 그대로 사용
export const Route = createFileRoute("/(auth)")({
  // 토큰이 없으면 하위 페이지를 보여 주기 전에 로그인 페이지로 보냄
  beforeLoad: () => {
    if (!useAuthStore.getState().accessToken) {
      throw redirect({ to: "/login" });
    }
  },
  component: () => <Outlet />,
});
