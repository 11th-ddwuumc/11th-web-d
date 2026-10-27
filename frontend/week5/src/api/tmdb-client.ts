import ky from "ky";
import { env } from "../config/env";

export const tmdbClient = ky.create({
    // baseURL 끝에는 / 붙이고 요청 path는 /없이 작성
  baseUrl: `${env.tmdbApiBaseUrl}/`,
  headers: {
    Authorization: `Bearer ${env.tmdbAccessToken}`,
  },
});