import { createRootRoute, Outlet } from "@tanstack/react-router";
import Header from "../component/layout/header";

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <main className="flex-1 pt-12 px-4 sm:px-6 md:px-10 lg:px-20 bg-gray-50 pb-16">
        <Outlet />
      </main>
    </>
  ),
  notFoundComponent: () => <main>페이지를 찾을 수 없어요.</main>,
});