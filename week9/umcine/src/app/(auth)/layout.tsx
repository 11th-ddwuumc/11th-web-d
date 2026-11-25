import { RequireAuth } from "../../components/auth/auth-guard";

// (auth) 폴더 안의 페이지(마이페이지, 내 정보 수정)가 공통으로 쓰는 레이아웃
// 폴더 이름의 괄호는 주소에 포함되지 않음 → /my, /my/edit 그대로 사용
export default function AuthLayout({ children }: LayoutProps<"/">) {
  return <RequireAuth>{children}</RequireAuth>;
}
