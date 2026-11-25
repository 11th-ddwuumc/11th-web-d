import { AuthGuard } from "../../component/auth/auth-guard";

// 로그인 후에만 접근할 수 있는 페이지의 공통 레이아웃
// (auth)는 URL에 나타나지 않는 폴더 그룹이에요.
export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
