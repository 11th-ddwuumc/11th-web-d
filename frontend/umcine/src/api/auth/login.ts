import { umcineClient } from "../umcine-client";

export interface LoginRequest {
  email: string;
  password: string;
}

// TODO: 실제 명세에 맞게 엔드포인트와 응답 필드 확인 필요
export interface LoginResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    accessToken: string;
    refreshToken?: string;
  };
}

export function login(body: LoginRequest) {
  return umcineClient.post("auth/login", { json: body }).json<LoginResponse>();
}
