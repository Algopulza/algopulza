package com.algopulza.backend.api.service;

import com.algopulza.backend.api.request.member.ModifyMemberReq;
import com.algopulza.backend.api.request.member.ModifyProfileImageReq;
import com.algopulza.backend.api.response.MemberRes;
import com.algopulza.backend.api.response.TokenRes;
import com.algopulza.backend.common.exception.NotFoundException;
import com.algopulza.backend.common.exception.handler.ErrorCode;
import com.algopulza.backend.config.jwt.JwtTokenProvider;
import com.algopulza.backend.db.entity.*;
import com.algopulza.backend.db.repository.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service("memberService")
@Transactional
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final JwtTokenProvider tokenProvider;
    private final MemberRepository memberRepository;
    private final LoginLogRepository loginLogRepository;
    private final TierRepository tierRepository;
    private final OrganizationRepository organizationRepository;
    private final MemberHasOrganizationRepository memberHasOrganizationRepository;
    private final ProblemRepository problemRepository;
    private final SolvingLogRepository solvingLogRepository;
    private final S3Service s3Service;
    private final JwtTokenProvider jwtTokenProvider;

    @Value("${solvedac.baseurl}")
    private String SolvedacBaseUrl;

    @Override
    public MemberRes getMember(Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND_MEMBER));
        MemberRes memberRes = MemberRes.builder()
                .memberId(member.getId())
                .memberName(member.getName())
                .profileImage(member.getProfileImage())
                .email(member.getEmail())
                .level(member.getTier().getLevel())
                .tierName(member.getTier().getName())
                .solveCount(member.getSolveCount())
                .daysCount(member.getDaysCount())
                .build();
        return memberRes;
    }

    @Override
    public void modifyProfileImage(ModifyProfileImageReq modifyProfileImageReq) {
        Member member = memberRepository.findById(modifyProfileImageReq.getMemberId()).orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND_MEMBER));
        member.setProfileImage(s3Service.uploadToMember(modifyProfileImageReq.getProfileImage()));
        memberRepository.save(member);
    }

    @Override
    public Member addMember(String solvedacToken) {

        // 1. solvedac API 활용해서 member 정보 받아오기

        JsonNode finalJsonNode = getMemberBysolvedacToken(solvedacToken);

        String name = finalJsonNode.get("user").get("handle").toString().substring(1, finalJsonNode.get("user").get("handle").toString().length() - 1);

        // 2. solvedacToken으로 받아온 name을 가지고 DB에서 회원 검색
        Optional<Member> member = Optional.ofNullable(memberRepository.findByName(name));

        member.ifPresentOrElse(selectMember -> {
            // 3-1. DB에 있는 회원이면 정보 갱신
            log.info("member already exist!!");

            // solvedacToken 갱신
            selectMember.setSolvedacToken(solvedacToken);

            // 기존의 solveCount랑 로그인할 당시 solveCount의 개수 다르면
            if(selectMember.getSolveCount()!=finalJsonNode.get("solved").size()){
                int prevCount = selectMember.getSolveCount();
                int curCount = finalJsonNode.get("solved").size();
                // solveCount랑 solving_log 갱신
                selectMember.setSolveCount(curCount);
                memberRepository.save(selectMember);
                modifySolvingLog(prevCount, curCount, finalJsonNode, name);
            }

            // 기존 tier와 다르면
            Long tier = Long.parseLong(finalJsonNode.get("user").get("tier").toString());
            Tier curTier = tierRepository.findByLevel(tier);

            if(selectMember.getTier()!=curTier){
                selectMember.setTier(curTier);
            }

        }, ()->{
            // 3-2. DB에 없는 회원이면 새로 등록
            log.info("new member!!");

            // member 추가
            addNewMember(finalJsonNode, name, solvedacToken);
            // solving_log 추가
            addSolvingLog(finalJsonNode, name);
            // organization & memberHasOrganization 추가
            // addMemberOrganizaton(finalJsonNode, name);
        });

        // 4. login_log 추가 (db 유무 상관없이 해야함)
        addLoginlog(name);

        return memberRepository.findByName(name);
    }


    private JsonNode getMemberBysolvedacToken(String solvedacToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Cookie", "solvedacToken=" + solvedacToken);

        HttpEntity<String> entity = new HttpEntity<String>("", headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> memberInfo
                = restTemplate.exchange(SolvedacBaseUrl+"account/verify_credentials", HttpMethod.GET, entity, String.class);

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = null;
        try {
            jsonNode = objectMapper.readTree(memberInfo.getBody());
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return jsonNode;
    }

    @Override
    public void modifyMember(ModifyMemberReq modifyMemberReq) {
        String name = modifyMemberReq.getName();
        String solvedacToken = modifyMemberReq.getSolvedacToken();

        Optional<Member> member = Optional.ofNullable(memberRepository.findByName(name));
        JsonNode finalJsonNode = getMemberBysolvedacToken(solvedacToken);

        member.ifPresent(selectMember->{
            // 기존의 solveCount랑 로그인할 당시 solveCount의 개수 다르면
            if(selectMember.getSolveCount()!=finalJsonNode.get("solved").size()){
                int prevCount = selectMember.getSolveCount();
                int curCount = finalJsonNode.get("solved").size();
                // solveCount랑 solving_log 갱신
                selectMember.setSolveCount(curCount);
                memberRepository.save(selectMember);
                modifySolvingLog(prevCount, curCount, finalJsonNode, name);
            }

            // 기존 tier와 다르면
            Long tier = Long.parseLong(finalJsonNode.get("user").get("tier").toString());
            Tier curTier = tierRepository.findByLevel(tier);

            if(selectMember.getTier()!=curTier){
                selectMember.setTier(curTier);
            }
        });
    }

    @Override
    public String createToken(Long id, List<String> roles) {
        return tokenProvider.createToken(id.toString(),roles);
    }

    @Override
    public String createRefreshToken(Long id) {
        Member member = memberRepository.findById(id).orElse(null);
        String refreshToken = tokenProvider.createRefreshToken();
        member.setRefreshToken(refreshToken);
        memberRepository.save(member);

        return tokenProvider.createRefreshToken();
    }

    /*
   refreshToken으로 accessToken 재발급
    */
    public TokenRes refreshAccessToken(Long id, String refreshToken) {
        return new TokenRes(tokenProvider.createToken(String.valueOf(id),null),refreshToken);
    }

    /*
    로그아웃
     */
    @Override
    public void logout(Long id) {
        // refreshToken 초기화
        Member member = memberRepository.findById(id).orElse(null);
        member.setRefreshToken(null);
        memberRepository.save(member);

    }

    private void addNewMember(JsonNode finalJsonNode, String name, String solvedacToken) {
        String profileImage = finalJsonNode.get("user").get("profileImageUrl").toString();
        String email = finalJsonNode.get("user").get("email").toString();

        Long tier = Long.parseLong(finalJsonNode.get("user").get("tier").toString());
        Tier getTier = tierRepository.findByLevel(tier);


        // member table 에 저장
        Member newMember = new Member();
        newMember.setTier(getTier);
        newMember.setName(name);
        newMember.setProfileImage(profileImage.substring(1,profileImage.length()-1));
        newMember.setSolveCount(finalJsonNode.get("solved").size());
        newMember.setEmail(email.substring(1,email.length()-1));
        newMember.setDaysCount(0); // TODO : dayscount 어떻게 할건지?
        newMember.setSolvedacToken(solvedacToken);
        memberRepository.save(newMember);
    }

    private void addSolvingLog(JsonNode finalJsonNode, String name) {
        int solvedSize = finalJsonNode.get("solved").size();
        for (int i = 0; i < solvedSize; i++) {
            int problemId = Integer.parseInt(finalJsonNode.get("solved").get(i).get("id").toString());
            String status = finalJsonNode.get("solved").get(i).get("status").toString();
            addProblem(name,problemId, status);
        }
    }

    private void addProblem(String name, int problemId, String status) {
        Problem problem = problemRepository.findByBojId(problemId).orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND_PROBLEM));
        Optional<Member> member = Optional.ofNullable(memberRepository.findByName(name));
        member.ifPresent(selectMember->{
            SolvingLog solvingLog = new SolvingLog();
            solvingLog.setMember(selectMember);
            solvingLog.setProblem(problem);
            solvingLog.setStatus(status);
            solvingLogRepository.save(solvingLog);
        });
    }

    private void addMemberOrganizaton(JsonNode finalJsonNode, String name) {
        int organizationSize = finalJsonNode.get("user").get("organizations").size();
        for (int i = 0; i < organizationSize; i++) {
            //organization 등록
            int organizationId = Integer.parseInt(finalJsonNode.get("user").get("organizations").get(i).get("organizationId").toString());
            String organizationName = finalJsonNode.get("user").get("organizations").get(i).get("name").toString();

            boolean typeFlag = true;
            addOrganization(organizationId, organizationName, typeFlag);
            //memberHasOrganization 등록
            addMemberHasOrganization(name, organizationName);
        }
    }

    private void addOrganization(int organizationId, String organizationName, boolean typeFlag) {
        Optional<Organization> organization =  organizationRepository.findByBojId(organizationId);
        //이미 존재하는 organization이면 pass, 아니면 새로 등록
        organization.ifPresentOrElse(selectorganization->{
            log.info("organization already exist!!");
        },()->{
            log.info("ew organization");
            Organization newOrganiation = new Organization();
            newOrganiation.setBojId(organizationId);
            newOrganiation.setName(organizationName);
            newOrganiation.setTypeFlag(typeFlag);
            organizationRepository.save(newOrganiation);
        });
    }

    private void addMemberHasOrganization(String name, String organizationName) {
        Organization organization = organizationRepository.findByName(organizationName);
        Optional<Member> member = Optional.ofNullable(memberRepository.findByName(name));
        member.ifPresent(selectMember->{
            MemberHasOrganization memberHasOrganization = new MemberHasOrganization();
            memberHasOrganization.setMember(selectMember);
            memberHasOrganization.setOrganization(organization);
            memberHasOrganizationRepository.save(memberHasOrganization);
        });
    }


    private void addLoginlog(String name) {
        Optional<Member> member = Optional.ofNullable(memberRepository.findByName(name));
        member.ifPresent(selectMember->{
            LoginLog loginLog = new LoginLog();
            loginLog.setMember(selectMember);
            loginLogRepository.save(loginLog);
        });
    }

    private void modifySolvingLog(int prevCount, int curCount, JsonNode finalJsonNode, String name) {
        for (int i = prevCount; i < curCount; i++) {
            int problemId = Integer.parseInt(finalJsonNode.get("solved").get(i).get("id").toString());
            String status = finalJsonNode.get("solved").get(i).get("status").toString();
            addProblem(name,problemId, status);
        }
    }
    
}
