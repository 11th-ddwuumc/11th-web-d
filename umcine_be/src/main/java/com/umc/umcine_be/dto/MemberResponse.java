package com.umc.umcine_be.dto;

public record MemberResponse(
        Long memberId,
        String email,
        String nickname
) {}
