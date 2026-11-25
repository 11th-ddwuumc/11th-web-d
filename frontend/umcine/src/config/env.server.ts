import "server-only";

// 서버에서만 쓰는 환경 변수예요. NEXT_PUBLIC_이 없어서 브라우저 번들에는 들어가지 않고,
// 클라이언트 컴포넌트에서 import하면 빌드가 실패해요.
const tmdbApiBaseUrl = process.env.TMDB_API_BASE_URL;
const tmdbAccessToken = process.env.TMDB_ACCESS_TOKEN;

if (!tmdbApiBaseUrl || !tmdbAccessToken) {
  throw new Error("TMDB 환경 변수(TMDB_API_BASE_URL, TMDB_ACCESS_TOKEN)가 필요해요.");
}

export const serverEnv = {
  tmdbApiBaseUrl,
  tmdbAccessToken,
};
