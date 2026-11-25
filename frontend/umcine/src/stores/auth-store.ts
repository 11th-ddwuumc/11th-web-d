import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthStore {
  accessToken: string | null;
  // localStorage에서 토큰을 읽어오는 일이 끝났는지 (서버/첫 렌더에서는 false)
  hasHydrated: boolean;
  setAccessToken: (accessToken: string | null) => void;
  setHasHydrated: (hasHydrated: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: null,
      hasHydrated: false,
      setAccessToken: (accessToken) => set({ accessToken }),
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
    }),
    {
      name: "umcine-auth-store",
      // 서버에는 localStorage가 없어서 브라우저에서만 저장소가 만들어져요.
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ accessToken: state.accessToken }),
      // 서버 HTML과 첫 클라이언트 렌더가 어긋나지 않도록 자동 복원을 끄고, Providers에서 직접 복원해요.
      skipHydration: true,
      onRehydrateStorage: () => (state) => state?.setHasHydrated(true),
    },
  ),
);
