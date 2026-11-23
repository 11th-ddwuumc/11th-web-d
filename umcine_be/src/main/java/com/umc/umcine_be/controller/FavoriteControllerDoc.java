package com.umc.umcine_be.controller;

import com.umc.umcine_be.config.SwaggerConfig;
import com.umc.umcine_be.dto.ApiResponse;
import com.umc.umcine_be.dto.CreateFavoriteRequest;
import com.umc.umcine_be.dto.FavoriteResponse;
import com.umc.umcine_be.dto.FavoriteStatusResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Tag(name = "Favorite", description = "즐겨찾기 API")
public interface FavoriteControllerDoc {

    @Operation(
            summary = "즐겨찾기 등록",
            description = "영화를 내 즐겨찾기에 등록합니다.",
            security = @SecurityRequirement(name = SwaggerConfig.BEARER_SCHEME),
            responses = {
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = "201", description = "즐겨찾기를 등록했습니다."),
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = "400", description = "COMMON4001: 요청 값이 올바르지 않습니다."),
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = "401", description = "AUTH401_2: 로그인이 필요한 요청입니다."),
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = "404", description = "MEMBER404_1: 해당 회원을 찾을 수 없습니다."),
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = "409", description = "FAVORITE409_1: 이미 이 영화를 즐겨찾기하셨습니다.")
            }
    )
    ResponseEntity<ApiResponse<FavoriteResponse>> create(
            @Parameter(hidden = true) Long memberId,
            CreateFavoriteRequest request
    );

    @Operation(
            summary = "내 즐겨찾기 목록 조회",
            description = "내가 즐겨찾기한 영화 목록을 조회합니다.",
            security = @SecurityRequirement(name = SwaggerConfig.BEARER_SCHEME),
            responses = {
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = "200", description = "내 즐겨찾기 목록을 조회했습니다."),
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = "401", description = "AUTH401_2: 로그인이 필요한 요청입니다.")
            }
    )
    ResponseEntity<ApiResponse<List<FavoriteResponse>>> getMyFavorites(
            @Parameter(hidden = true) Long memberId
    );

    @Operation(
            summary = "즐겨찾기 여부 조회",
            description = "특정 영화를 내가 즐겨찾기했는지 조회합니다.",
            security = @SecurityRequirement(name = SwaggerConfig.BEARER_SCHEME),
            responses = {
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = "200", description = "즐겨찾기 여부를 조회했습니다."),
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = "401", description = "AUTH401_2: 로그인이 필요한 요청입니다.")
            }
    )
    ResponseEntity<ApiResponse<FavoriteStatusResponse>> getStatus(
            @Parameter(hidden = true) Long memberId,
            @Parameter(description = "영화 ID", example = "1") Long movieId
    );

    @Operation(
            summary = "즐겨찾기 해제",
            description = "즐겨찾기에 등록한 영화를 해제합니다.",
            security = @SecurityRequirement(name = SwaggerConfig.BEARER_SCHEME),
            responses = {
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = "200", description = "즐겨찾기를 해제했습니다."),
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = "401", description = "AUTH401_2: 로그인이 필요한 요청입니다."),
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = "404", description = "FAVORITE404_1: 즐겨찾기한 영화를 찾을 수 없습니다.")
            }
    )
    ResponseEntity<ApiResponse<Void>> delete(
            @Parameter(hidden = true) Long memberId,
            @Parameter(description = "영화 ID", example = "1") Long movieId
    );
}
