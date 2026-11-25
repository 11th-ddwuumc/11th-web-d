import LoginPage from "../../views/auth/login-page";
import { GuestGuard } from "../../component/auth/auth-guard";

export default function Page() {
  return (
    <GuestGuard>
      <LoginPage />
    </GuestGuard>
  );
}
