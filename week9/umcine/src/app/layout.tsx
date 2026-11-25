import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Header } from "../components/layout/header";
import { Providers } from "./providers";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UMCine",
  description: "TMDB 영화 정보를 보고 평점과 즐겨찾기를 남기는 영화 서비스예요.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={geist.className}>
      <body className="flex min-h-screen flex-col bg-[#f5f6f8] text-gray-900">
        <Providers>
          <Header />
          {children}
          <footer className="flex items-center justify-end gap-2 border-t border-gray-200 bg-white px-6 py-4 text-[11px] text-gray-500">
            <img src="/images/logos/tmdb-logo.svg" alt="TMDB" className="h-3" />
            <p>
              This product uses the TMDB API but is not endorsed or certified
              by TMDB.
            </p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
