package com.umc.movie.dto;

import com.umc.movie.entity.Member;

import java.time.LocalDateTime;

public record MemberInfoResponse(
        // 프론트가 GET /members/{memberId}/ratings로 내 평점을 조회할 때 사용합니다
        Long memberId,
        String email,
        String nickname,
        LocalDateTime createdAt
) {
    // 엔티티를 그대로 응답하면 password까지 나가버리므로 반드시 DTO로 옮겨 담습니다
    public static MemberInfoResponse from(Member member) {
        return new MemberInfoResponse(
                member.getMemberId(),
                member.getEmail(),
                member.getNickname(),
                member.getCreatedAt()
        );
    }
}
