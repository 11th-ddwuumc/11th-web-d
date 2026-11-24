import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useAuthStore } from "../../stores/auth-store";

// 로그인 후에만 접근할 수 있는 페이지의 공통 레이아웃
// (auth): 폴더 정리용 그룹, _authenticated: URL에 나타나지 않는 레이아웃
export const Route = createFileRoute("/(auth)/_authenticated")({
  beforeLoad: () => {
    if (!useAuthStore.getState().accessToken) {
      throw redirect({ to: "/login" });
    }
  },
  component: Outlet,
});
