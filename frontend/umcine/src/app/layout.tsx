import type { Metadata } from "next";
import Header from "../component/layout/header";
import Providers from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "UMCine",
  description: "영화 검색, 즐겨찾기, 평점을 남기는 UMCine",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          <Header />
          <main className="min-h-dvh pt-12 px-4 sm:px-6 md:px-10 lg:px-20 bg-gray-50 pb-16">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
