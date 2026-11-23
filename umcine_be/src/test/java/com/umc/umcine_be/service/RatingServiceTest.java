package com.umc.umcine_be.service;

import com.umc.umcine_be.dto.CreateRatingRequest;
import com.umc.umcine_be.dto.UpdateRatingRequest;
import com.umc.umcine_be.entity.Member;
import com.umc.umcine_be.entity.Rating;
import com.umc.umcine_be.exception.ApiException;
import com.umc.umcine_be.repository.MemberRepository;
import com.umc.umcine_be.repository.RatingRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class) // @Mock이 붙은 가짜 객체를 만들어주는 확장입니다
class RatingServiceTest {

    @Mock
    private RatingRepository ratingRepository; // 진짜 DB 대신 들어가는 가짜 Repository

    @Mock
    private MemberRepository memberRepository;

    @InjectMocks
    private RatingService ratingService; // 위의 가짜 두 개를 주입받은 진짜 Service

    @Test
    @DisplayName("이미 평점을 남긴 영화에 다시 등록하면 RATING409_1 예외를 던지고 저장하지 않는다")
    void createRatingWhenDuplicated() {
        // given: 같은 회원이 같은 영화에 이미 평점을 남겨 둔 상황
        Member member = createMember(1L, "challenger@umc.com", "영화조아");
        given(memberRepository.findById(1L)).willReturn(Optional.of(member));
        given(ratingRepository.existsByMember_MemberIdAndMovieId(1L, 550L)).willReturn(true);

        // when & then: 409 + RATING409_1 예외가 나고, 저장은 시도조차 하지 않는다
        assertThatThrownBy(() -> ratingService.create(1L, new CreateRatingRequest(550L, 5, "최고예요")))
                .isInstanceOfSatisfying(ApiException.class, e -> {
                    assertThat(e.getCode()).isEqualTo("RATING409_1");
                    assertThat(e.getStatus()).isEqualTo(HttpStatus.CONFLICT);
                });

        verify(ratingRepository, never()).save(any(Rating.class));
    }

    @Test
    @DisplayName("남의 평점을 수정하려 하면 RATING403_1 예외를 던지고 수정하지 않는다")
    void updateRatingOfOtherMember() {
        // given: 평점 10번은 2번 회원의 것인데, 1번 회원이 수정하려는 상황
        Member owner = createMember(2L, "owner@umc.com", "주인");
        Rating rating = Rating.builder().member(owner).movieId(550L).score(3).comment("보통이에요").build();
        given(ratingRepository.findById(10L)).willReturn(Optional.of(rating));

        // when & then: 403 + RATING403_1 예외가 나고, 평점 내용은 그대로이며 저장도 하지 않는다
        assertThatThrownBy(() -> ratingService.update(1L, 10L, new UpdateRatingRequest(1, "별로예요")))
                .isInstanceOfSatisfying(ApiException.class, e -> {
                    assertThat(e.getCode()).isEqualTo("RATING403_1");
                    assertThat(e.getStatus()).isEqualTo(HttpStatus.FORBIDDEN);
                });

        assertThat(rating.getScore()).isEqualTo(3);
        assertThat(rating.getComment()).isEqualTo("보통이에요");
        verify(ratingRepository, never()).save(any(Rating.class));
    }

    // Member에는 id를 넣는 setter가 없어서, 테스트에서만 리플렉션으로 id를 지정합니다
    private Member createMember(Long memberId, String email, String nickname) {
        Member member = Member.builder()
                .email(email)
                .password("암호화된비밀번호")
                .nickname(nickname)
                .build();
        ReflectionTestUtils.setField(member, "memberId", memberId);
        return member;
    }
}
