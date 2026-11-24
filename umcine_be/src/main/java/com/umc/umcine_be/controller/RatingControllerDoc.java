package com.umc.umcine_be.controller;

import com.umc.umcine_be.config.SwaggerConfig;
import com.umc.umcine_be.dto.ApiResponse;
import com.umc.umcine_be.dto.CreateRatingRequest;
import com.umc.umcine_be.dto.RatingResponse;
import com.umc.umcine_be.dto.UpdateRatingRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Tag(name = "Rating", description = "평점 API")
public interface RatingControllerDoc {

    @Operation(
            summary = "회원별 평점 목록 조회",
            description = "특정 회원이 남긴 평점 목록을 조회합니다.",
            responses = {
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = "200", description = "평점 목록을 조회했습니다."),
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = "404", description = "MEMBER404_1: 해당 회원을 찾을 수 없습니다.")
            }
    )
    List<RatingResponse> getMemberRatings(
            @Parameter(description = "회원 ID", example = "1") Long memberId
    );

    @Operation(
            summary = "평점 등록",
            description = "영화에 별점(1~5)과 후기(최대 500자)를 등록합니다. 성공하면 생성된 평점 ID를 반환합니다.",
            security = @SecurityRequirement(name = SwaggerConfig.BEARER_SCHEME),
            responses = {
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = "201", description = "평점을 등록했습니다."),
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = "400", description = "COMMON4001: 요청 값이 올바르지 않습니다."),
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = "401", description = "AUTH401_2: 로그인이 필요한 요청입니다."),
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = "404", description = "MEMBER404_1: 해당 회원을 찾을 수 없습니다."),
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = "409", description = "RATING409_1: 이미 이 영화에 평점을 남기셨습니다.")
            }
    )
    ResponseEntity<ApiResponse<Long>> create(
            @Parameter(hidden = true) Long memberId,
            CreateRatingRequest request
    );

    @Operation(
            summary = "평점 수정",
            description = "내가 등록한 평점의 별점과 후기를 수정합니다.",
            security = @SecurityRequirement(name = SwaggerConfig.BEARER_SCHEME),
            responses = {
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = "200", description = "평점을 수정했습니다."),
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = "400", description = "COMMON4001: 요청 값이 올바르지 않습니다."),
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = "401", description = "AUTH401_2: 로그인이 필요한 요청입니다."),
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = "403", description = "RATING403_1: 본인이 작성한 평점만 수정하거나 삭제할 수 있습니다."),
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = "404", description = "RATING404_1: 해당 평점을 찾을 수 없습니다.")
            }
    )
    ResponseEntity<ApiResponse<RatingResponse>> update(
            @Parameter(hidden = true) Long memberId,
            @Parameter(description = "평점 ID", example = "1") Long ratingId,
            UpdateRatingRequest request
    );

    @Operation(
            summary = "평점 삭제",
            description = "내가 등록한 평점을 삭제합니다.",
            security = @SecurityRequirement(name = SwaggerConfig.BEARER_SCHEME),
            responses = {
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = "200", description = "평점을 삭제했습니다."),
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = "401", description = "AUTH401_2: 로그인이 필요한 요청입니다."),
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = "403", description = "RATING403_1: 본인이 작성한 평점만 수정하거나 삭제할 수 있습니다."),
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = "404", description = "RATING404_1: 해당 평점을 찾을 수 없습니다.")
            }
    )
    ResponseEntity<ApiResponse<Void>> delete(
            @Parameter(hidden = true) Long memberId,
            @Parameter(description = "평점 ID", example = "1") Long ratingId
    );
}
