package com.umc.umcine_be.dto;

import com.umc.umcine_be.entity.Member;

import java.time.LocalDateTime;

public record MemberInfoResponse (
        String email,
        String nickname,
        LocalDateTime createdAt
){
    public static MemberInfoResponse from(Member member) {
        return new MemberInfoResponse(
                member.getEmail(),
                member.getNickname(),
                member.getCreatedAt()
        );
    }
}
