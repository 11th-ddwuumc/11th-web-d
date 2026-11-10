package com.umc.umcine_be.dto;

public record LoginResponse (
        String nickname,
        String accessToken
){
}
