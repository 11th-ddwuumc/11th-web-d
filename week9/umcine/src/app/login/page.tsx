import type { Metadata } from "next";
import { GuestOnly } from "../../components/auth/auth-guard";
import { LoginPage } from "../../views/auth/login-page";

export const metadata: Metadata = {
  title: "로그인 | UMCine",
};

export default function LoginRoute() {
  return (
    <GuestOnly>
      <LoginPage />
    </GuestOnly>
  );
}
