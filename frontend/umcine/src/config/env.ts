// 브라우저에서 쓰는 환경 변수예요. (TMDB 토큰은 서버 전용이라 env.server.ts에 있어요.)
// Next.js는 `process.env.NEXT_PUBLIC_*`를 정적으로 써야 브라우저 번들에 값이 들어가요. (동적 접근 불가)
const umcineApiBaseUrl = process.env.NEXT_PUBLIC_UMCINE_API_BASE_URL;

export const env = {
  umcineApiBaseUrl,
};
