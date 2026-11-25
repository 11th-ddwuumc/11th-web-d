"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useAuthHydrated, useAuthStore } from "../../stores/auth-store";

// 토큰은 브라우저 localStorage에만 있어서 서버에서는 로그인 여부를 알 수 없음.
// 그래서 TanStack Router의 beforeLoad 대신, 브라우저에서 토큰 복원이 끝난 뒤 이동시킴

export function RequireAuth({ children }: { children: ReactNode }) {
  const router = useRouter();
  const isAuthHydrated = useAuthHydrated();
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    if (isAuthHydrated && !accessToken) {
      router.replace("/login");
    }
  }, [isAuthHydrated, accessToken, router]);

  if (!isAuthHydrated || !accessToken) return null;
  return children;
}

export function GuestOnly({ children }: { children: ReactNode }) {
  const router = useRouter();
  const isAuthHydrated = useAuthHydrated();
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    if (isAuthHydrated && accessToken) {
      router.replace("/");
    }
  }, [isAuthHydrated, accessToken, router]);

  if (!isAuthHydrated || accessToken) return null;
  return children;
}
