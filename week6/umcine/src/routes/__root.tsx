import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Header } from "../components/layout/header";

export const Route = createRootRoute({
  component: () => (
    <div className="flex min-h-screen flex-col bg-[#f5f6f8] text-gray-900">
      <Header />
      <Outlet />
      <footer className="flex items-center justify-end gap-2 border-t border-gray-200 bg-white px-6 py-4 text-[11px] text-gray-500">
        <img src="/images/logos/tmdb-logo.svg" alt="TMDB" className="h-3" />
        <p>
          This product uses the TMDB API but is not endorsed or certified by
          TMDB.
        </p>
      </footer>
    </div>
  ),
  notFoundComponent: () => <main>페이지를 찾을 수 없어요.</main>,
});
