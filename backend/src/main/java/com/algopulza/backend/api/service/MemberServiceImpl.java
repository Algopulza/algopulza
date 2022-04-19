package com.algopulza.backend.api.service;

import com.algopulza.backend.api.request.member.ModifyMemberReq;
import com.algopulza.backend.db.entity.Member;
import com.algopulza.backend.db.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service("memberService")
public class MemberServiceImpl implements MemberService {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private S3Service s3Service;

    @Override
    public Member GetMember(int memberId) {
        Member member = new Member();
        Optional<Member> getMember =  memberRepository.findById((long)memberId);
        getMember.ifPresent(selectMember->{
            member.setId(selectMember.getId());
            member.setName(selectMember.getName());
            member.setProfileImage(selectMember.getProfileImage());
            member.setEmail(selectMember.getEmail());
            member.setTier(selectMember.getTier());
            member.setDaysCount(selectMember.getDaysCount());
            member.setSolveCount(selectMember.getSolveCount());
        });

        return member;
    }

    @Override
    public void modifyMember(ModifyMemberReq modifyMemberReq) {
        Optional<Member> getMember =  memberRepository.findById((long)modifyMemberReq.getId());
        getMember.ifPresent(selectMember->{
           selectMember.setProfileImage(s3Service.uploadToMember(modifyMemberReq.getProfileImage()));
           memberRepository.save(selectMember);
        });
    }
}
