import ky from "ky";

// TMDB를 직접 부르지 않고, 토큰을 붙여주는 우리 서버(/api/tmdb)를 거쳐요.
// baseURL 끝에는 / 붙이고 요청 path는 /없이 작성
export const tmdbClient = ky.create({
  baseUrl: "/api/tmdb/",
});
