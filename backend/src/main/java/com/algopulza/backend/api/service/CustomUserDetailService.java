package com.algopulza.backend.api.service;

import com.algopulza.backend.db.entity.Member;
import com.algopulza.backend.db.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class CustomUserDetailService implements UserDetailsService {
    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
        Member member = memberRepository.findByBojId(name);
        if(member != null) return (UserDetails) member;
        else throw new UsernameNotFoundException("사용자를 찾을 수 없습니다.");

    }
}
