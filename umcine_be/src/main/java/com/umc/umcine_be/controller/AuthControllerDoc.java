package com.umc.umcine_be.controller;

import com.umc.umcine_be.dto.ApiResponse;
import com.umc.umcine_be.dto.LoginRequest;
import com.umc.umcine_be.dto.LoginResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;

@Tag(name = "Auth", description = "인증 API")
public interface AuthControllerDoc {

    @Operation(
            summary = "로그인",
            description = "이메일과 비밀번호로 로그인하고 accessToken을 발급받습니다. 발급받은 토큰은 Authorize에 입력해 인증이 필요한 API에 사용하세요.",
            responses = {
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = "200", description = "로그인에 성공했습니다."),
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = "400", description = "COMMON4001: 요청 값이 올바르지 않습니다."),
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = "401", description = "AUTH401_1: 이메일 또는 비밀번호가 올바르지 않습니다.")
            }
    )
    ResponseEntity<ApiResponse<LoginResponse>> login(LoginRequest request);
}
