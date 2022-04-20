package com.algopulza.backend.api.service;

import com.algopulza.backend.api.request.member.ModifyMemberReq;
import com.algopulza.backend.db.entity.LoginLog;
import com.algopulza.backend.db.entity.Member;
import com.algopulza.backend.db.repository.LoginLogRepository;
import com.algopulza.backend.db.repository.MemberRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.Charset;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@Service("memberService")
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final LoginLogRepository loginLogRepository;
    private final S3Service s3Service;

    @Override
    public Member getMember(int memberId) {
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

    @Override
    public void addMember(String solvedacToken) throws JsonProcessingException {

        //solvedac API 활용해서 member 정보 받아오기
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Cookie","solvedacToken="+solvedacToken);

        HttpEntity<String> entity = new HttpEntity<String>("", headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> memberInfo = restTemplate.exchange("https://solved.ac/api/v3/account/verify_credentials", HttpMethod.GET, entity, String.class);


        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(memberInfo.getBody());

        String name = jsonNode.get("user").get("handle").toString();

        //login_log 등록
        addLoginlog(name.substring(1,name.length()-1));

        //회원 검색
        Optional<Member> member = memberRepository.findByName(name.substring(1,name.length()-1));

        //이미 등록된 회원이면 solvedac token만 업데이트, 아니면 새 회원으로 등록
        member.ifPresentOrElse(selectMember -> {
            System.out.println("member already exist!!");
            selectMember.setSolvedacToken(solvedacToken);
            memberRepository.save(selectMember);
        }, ()->{
            System.out.println("new member!!");

            String profileImage = jsonNode.get("user").get("profileImageUrl").toString();
            String email = jsonNode.get("user").get("email").toString();

            Member newMember = new Member();
//            newMember.setTier(Integer.parseInt(jsonNode.get("user").get("tier").toString()));
            newMember.setName(name.substring(1,name.length()-1));
            newMember.setProfileImage(profileImage.substring(1,profileImage.length()-1));
            newMember.setSolveCount(Integer.parseInt(jsonNode.get("user").get("solvedCount").toString()));
            newMember.setEmail(email.substring(1,email.length()-1));
            newMember.setDaysCount(0);
            newMember.setSolvedacToken(solvedacToken);
            memberRepository.save(newMember);
        });

        System.out.println(jsonNode.get("user").get("organizations").size());
//        if(jsonNode.get("user").get("organizations").size()>0){
//
//        }


    }

    private void addLoginlog(String name) {
        Optional<Member> member = memberRepository.findByName(name);
        member.ifPresent(selectMember->{
            LoginLog loginLog = new LoginLog();
//            loginLog.setMemberId(selectMember.getId());
            loginLogRepository.save(loginLog);
        });
    }
}
