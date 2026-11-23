package com.umc.umcine_be.controller;

import com.umc.umcine_be.config.SwaggerConfig;
import com.umc.umcine_be.dto.ApiResponse;
import com.umc.umcine_be.dto.EmailCheckResponse;
import com.umc.umcine_be.dto.MemberInfoResponse;
import com.umc.umcine_be.dto.MemberResponse;
import com.umc.umcine_be.dto.MemberUpdateRequest;
import com.umc.umcine_be.dto.NicknameCheckResponse;
import com.umc.umcine_be.dto.SignUpRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;

@Tag(name = "Member", description = "회원 API")
public interface MemberControllerDoc {

    @Operation(
            summary = "닉네임 중복 확인",
            description = "사용하려는 닉네임이 이미 사용 중인지 확인합니다.",
            responses = {
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = "200", description = "닉네임 사용 가능 여부를 반환합니다.")
            }
    )
    NicknameCheckResponse checkNickname(
            @Parameter(description = "중복 확인할 닉네임", example = "umcine") String nickname
    );

    @Operation(
            summary = "이메일 중복 확인",
            description = "사용하려는 이메일이 이미 가입되어 있는지 확인합니다.",
            responses = {
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = "200", description = "이메일 사용 가능 여부를 반환합니다.")
            }
    )
    EmailCheckResponse checkEmail(
            @Parameter(description = "중복 확인할 이메일", example = "user@example.com") String email
    );

    @Operation(
            summary = "회원가입",
            description = "이메일, 비밀번호, 닉네임으로 회원가입합니다.",
            responses = {
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = "201", description = "회원가입에 성공했습니다."),
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = "400", description = "COMMON4001: 요청 값이 올바르지 않습니다."),
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = "409", description = "COMMON4092: 이미 사용 중인 이메일 또는 닉네임입니다.")
            }
    )
    ResponseEntity<ApiResponse<MemberResponse>> signUp(SignUpRequest request);

    @Operation(
            summary = "내 정보 조회",
            description = "로그인한 회원의 정보를 조회합니다.",
            security = @SecurityRequirement(name = SwaggerConfig.BEARER_SCHEME),
            responses = {
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = "200", description = "회원 정보를 조회했습니다."),
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = "401", description = "AUTH401_2: 로그인이 필요한 요청입니다."),
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = "404", description = "MEMBER404_1: 해당 회원을 찾을 수 없습니다.")
            }
    )
    ResponseEntity<ApiResponse<MemberInfoResponse>> getMyInfo(
            @Parameter(hidden = true) Long memberId
    );

    @Operation(
            summary = "내 정보 수정",
            description = "로그인한 회원의 닉네임을 수정합니다.",
            security = @SecurityRequirement(name = SwaggerConfig.BEARER_SCHEME),
            responses = {
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = "200", description = "회원 정보를 수정했습니다."),
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = "400", description = "COMMON4001: 요청 값이 올바르지 않습니다."),
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = "401", description = "AUTH401_2: 로그인이 필요한 요청입니다."),
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = "404", description = "MEMBER404_1: 해당 회원을 찾을 수 없습니다."),
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = "409", description = "MEMBER409_1: 이미 사용 중인 닉네임입니다.")
            }
    )
    ResponseEntity<ApiResponse<MemberInfoResponse>> updateMyInfo(
            @Parameter(hidden = true) Long memberId,
            MemberUpdateRequest request
    );
}
