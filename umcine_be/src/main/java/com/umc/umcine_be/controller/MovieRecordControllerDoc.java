package com.umc.umcine_be.controller;

import com.umc.umcine_be.config.SwaggerConfig;
import com.umc.umcine_be.dto.ApiResponse;
import com.umc.umcine_be.dto.CreateMovieRecordRequest;
import com.umc.umcine_be.dto.MovieRecordResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;

@Tag(name = "MovieRecord", description = "영화 기록 API (평점 + 즐겨찾기)")
public interface MovieRecordControllerDoc {

    @Operation(
            summary = "영화 기록 저장",
            description = "평점을 등록하면서 즐겨찾기 추가 여부(addToFavorites)에 따라 즐겨찾기도 함께 등록합니다.",
            security = @SecurityRequirement(name = SwaggerConfig.BEARER_SCHEME),
            responses = {
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = "201", description = "영화 기록을 저장했습니다."),
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = "400", description = "COMMON4001: 요청 값이 올바르지 않습니다."),
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = "401", description = "AUTH401_2: 로그인이 필요한 요청입니다."),
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = "404", description = "MEMBER404_1: 해당 회원을 찾을 수 없습니다."),
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = "409", description = "RATING409_1 / FAVORITE409_1: 이미 평점을 남겼거나 즐겨찾기한 영화입니다.")
            }
    )
    ResponseEntity<ApiResponse<MovieRecordResponse>> create(
            @Parameter(hidden = true) Long memberId,
            CreateMovieRecordRequest request
    );
}
