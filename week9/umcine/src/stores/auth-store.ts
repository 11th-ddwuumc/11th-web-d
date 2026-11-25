import { useSyncExternalStore } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthStore {
  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: null,
      setAccessToken: (accessToken) => set({ accessToken }),
    }),
    {
      name: "umcine-auth-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ accessToken: state.accessToken }),
      // 서버에는 localStorage가 없어서 서버 HTML은 항상 "토큰 없음"으로 그려짐.
      // 브라우저에서 바로 토큰을 읽으면 첫 화면이 서버 HTML과 달라지므로(hydration 오류)
      // 자동 복원을 끄고, Providers의 useEffect에서 브라우저에 그려진 뒤 복원함
      skipHydration: true,
    },
  ),
);

// localStorage에서 토큰 복원이 끝났는지 여부. 서버와 첫 렌더링에서는 항상 false
export function useAuthHydrated() {
  return useSyncExternalStore(
    (onChange) => useAuthStore.persist.onFinishHydration(onChange),
    () => useAuthStore.persist.hasHydrated(),
    () => false,
  );
}
