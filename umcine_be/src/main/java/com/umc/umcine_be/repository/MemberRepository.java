package com.umc.umcine_be.repository;

import com.umc.umcine_be.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
    boolean existsByNickname(String nickname);
    boolean existsByEmail(String email);
}