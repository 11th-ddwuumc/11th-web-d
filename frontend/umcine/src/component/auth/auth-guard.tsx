"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../stores/auth-store";

// 토큰은 localStorage에 있어서 서버는 로그인 여부를 몰라요.
// 그래서 브라우저에서 토큰 복원이 끝난 뒤에 이동시키고, 그동안은 아무것도 그리지 않아요.
function useAuthState() {
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const accessToken = useAuthStore((state) => state.accessToken);
  return { hasHydrated, isLoggedIn: Boolean(accessToken) };
}

// 로그인한 사용자만 볼 수 있는 페이지용
export function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { hasHydrated, isLoggedIn } = useAuthState();

  useEffect(() => {
    if (hasHydrated && !isLoggedIn) router.replace("/login");
  }, [hasHydrated, isLoggedIn, router]);

  if (!hasHydrated || !isLoggedIn) return null;
  return children;
}

// 이미 로그인한 사용자는 로그인 페이지 대신 홈으로 이동
export function GuestGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { hasHydrated, isLoggedIn } = useAuthState();

  useEffect(() => {
    if (hasHydrated && isLoggedIn) router.replace("/");
  }, [hasHydrated, isLoggedIn, router]);

  if (!hasHydrated || isLoggedIn) return null;
  return children;
}
