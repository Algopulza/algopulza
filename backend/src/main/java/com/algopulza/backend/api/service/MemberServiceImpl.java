package com.algopulza.backend.api.service;

import com.algopulza.backend.api.request.member.ModifyMemberReq;
import com.algopulza.backend.db.entity.*;
import com.algopulza.backend.db.repository.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

@Service("memberService")
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final LoginLogRepository loginLogRepository;
    private  final TierRepository tierRepository;
    private  final OrganizationRepository organizationRepository;
    private  final MemberHasOrganizationRepository memberHasOrganizationRepository;
    private  final ProblemRepository problemRepository;
    private  final SolvingLogRepository solvingLogRepository;
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

        System.out.println(jsonNode);

        String name = jsonNode.get("user").get("handle").toString().substring(1,jsonNode.get("user").get("handle").toString().length()-1);

        //회원 검색
        Optional<Member> member = memberRepository.findByName(name);

        //이미 등록된 회원이면 solvedac token만 업데이트, 아니면 새 회원으로 등록
        member.ifPresentOrElse(selectMember -> {
            //TODO : 이미 등록된 회원이라해도 정보 갱신을 위해 로그인 해주면 데이터 업데이트 해주어야하는데,, dayscount 빼고 다 업데이트 해줘야하나?
            System.out.println("member already exist!!");
            selectMember.setSolvedacToken(solvedacToken);
            memberRepository.save(selectMember);
        }, ()->{
            System.out.println("new member!!");

            String profileImage = jsonNode.get("user").get("profileImageUrl").toString();
            String email = jsonNode.get("user").get("email").toString();
            Long tier = Long.parseLong(jsonNode.get("user").get("tier").toString());

            Tier getTier = tierRepository.findByLevel(tier);

            Member newMember = new Member();
            newMember.setTier(getTier);
            newMember.setName(name);
            newMember.setProfileImage(profileImage.substring(1,profileImage.length()-1));
            newMember.setSolveCount(Integer.parseInt(jsonNode.get("user").get("solvedCount").toString()));
            newMember.setEmail(email.substring(1,email.length()-1));
            newMember.setDaysCount(0);
            newMember.setSolvedacToken(solvedacToken);
            memberRepository.save(newMember);
        });

        int organizationSize = jsonNode.get("user").get("organizations").size();
        for (int i = 0; i < organizationSize; i++) {
            //organization 등록
            int organizationId = Integer.parseInt(jsonNode.get("user").get("organizations").get(i).get("organizationId").toString());
            String organizationName = jsonNode.get("user").get("organizations").get(i).get("name").toString();
            //TODO : typeFlag 왜 boolean 값인건지 궁금해효 혜지박사님~!~!~!~!
            boolean typeFlag = true;
            addOrganization(organizationId, organizationName, typeFlag);
            //memberHasOrganization 등록
            addMemberHasOrganization(name, organizationName);
        }

        int solvedSize = jsonNode.get("solved").size();
        for (int i = 0; i < solvedSize; i++) {
            //solving_log 등록
            int problemId = Integer.parseInt(jsonNode.get("solved").get(i).get("id").toString());
            String status = jsonNode.get("solved").get(i).get("status").toString();
            addSolvingLog(name,problemId, status);
        }

        //login_log 등록
        addLoginlog(name);

    }

    private void addSolvingLog(String name, int problemId, String status) {
        Problem problem = problemRepository.findByBaekjoonId(problemId);
        Optional<Member> member = memberRepository.findByName(name);
        member.ifPresent(selectMember->{
            SolvingLog solvingLog = new SolvingLog();
            solvingLog.setMember(selectMember);
            solvingLog.setProblem(problem);
            solvingLog.setStatus(status);
            solvingLogRepository.save(solvingLog);
        });
    }

    private void addMemberHasOrganization(String name, String organizationName) {
        Organization organization = organizationRepository.findByName(organizationName);
        Optional<Member> member = memberRepository.findByName(name);
        member.ifPresent(selectMember->{
            MemberHasOrganization memberHasOrganization = new MemberHasOrganization();
            memberHasOrganization.setMember(selectMember);
            memberHasOrganization.setOrganization(organization);
            memberHasOrganizationRepository.save(memberHasOrganization);
        });
    }

    private void addOrganization(int organizationId, String organizationName, boolean typeFlag) {
       Optional<Organization> organization =  organizationRepository.findByBaekjoonId(organizationId);
       //이미 존재하는 organization이면 pass, 아니면 새로 등록
       organization.ifPresentOrElse(selectorganization->{
           System.out.println("organization already exist!!");
       },()->{
           System.out.println("new organization");
           Organization newOrganiation = new Organization();
           newOrganiation.setBaekjoonId(organizationId);
           newOrganiation.setName(organizationName);
           newOrganiation.setTypeFlag(typeFlag);
           organizationRepository.save(newOrganiation);
       });
    }

    private void addLoginlog(String name) {
        Optional<Member> member = memberRepository.findByName(name);
        member.ifPresent(selectMember->{
            LoginLog loginLog = new LoginLog();
            loginLog.setMember(selectMember);
            loginLogRepository.save(loginLog);
        });
    }
}
