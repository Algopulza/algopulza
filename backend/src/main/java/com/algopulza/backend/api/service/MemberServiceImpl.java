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

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicReference;

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
                .bojId(member.getBojId())
                .profileImage(member.getProfileImage())
                .email(member.getEmail())
                .level(member.getTier().getId())
                .tierName(member.getTier().getName())
                .solveCount(member.getSolveCount())
                .exp(member.getExp())
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
    public MemberRes addMember(String solvedacToken) {

        // 1. solvedac API 활용해서 member 정보 받아오기

        JsonNode finalJsonNode = getMemberBysolvedacToken(solvedacToken);

        String bojId = finalJsonNode.get("user").get("handle").toString().substring(1, finalJsonNode.get("user").get("handle").toString().length() - 1);

        // 2. solvedacToken으로 받아온 bojId를 가지고 DB에서 회원 검색
        Optional<Member> member = Optional.ofNullable(memberRepository.findByBojId(bojId));

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
                modifySolvingLog(prevCount, curCount, finalJsonNode, bojId);
                memberRepository.save(selectMember);
            }

            // 기존 tier와 다르면
            Long tier = Long.parseLong(finalJsonNode.get("user").get("tier").toString());
            Tier curTier = tierRepository.findByLevel(tier);
            if(selectMember.getTier()!=curTier){
                selectMember.setTier(curTier);
            }

            // 로그인 로그 확인 -> 오늘 첫 방문이면 +2 , 오늘첫방문+어제도방문이면 +3
            switch (checkDay(bojId)){
                case "first" :
                    selectMember.setExp(selectMember.getExp()+2);
                    break;
                case "visited" :
                    selectMember.setExp(selectMember.getExp()+3);
                    break;
                case "second" :
                    break;
            }

        }, ()->{
            // 3-2. DB에 없는 회원이면 새로 등록
            log.info("new member!!");

            // member 추가
            addNewMember(finalJsonNode, bojId, solvedacToken);
            // solving_log 추가
            addSolvingLog(finalJsonNode, bojId);
            // organization & memberHasOrganization 추가
            // addMemberOrganizaton(finalJsonNode, name);
        });

        // 4. login_log 추가 (db 유무 상관없이 해야함)
        addLoginlog(bojId);

        Optional<Member> mem = Optional.ofNullable(memberRepository.findByBojId(bojId));
        MemberRes memberRes = getMember(mem.get().getId());

        return memberRes;
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
        String bojId = modifyMemberReq.getBojId();
        String solvedacToken = modifyMemberReq.getSolvedacToken();

        Optional<Member> member = Optional.ofNullable(memberRepository.findByBojId(bojId));
        JsonNode finalJsonNode = getMemberBysolvedacToken(solvedacToken);

        member.ifPresent(selectMember->{
            // 기존의 solveCount랑 로그인할 당시 solveCount의 개수 다르면
            if(selectMember.getSolveCount()!=finalJsonNode.get("solved").size()){
                int prevCount = selectMember.getSolveCount();
                int curCount = finalJsonNode.get("solved").size();
                // solveCount랑 solving_log 갱신
                selectMember.setSolveCount(curCount);

                modifySolvingLog(prevCount, curCount, finalJsonNode, bojId);
                memberRepository.save(selectMember);
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

    private void addNewMember(JsonNode finalJsonNode, String bojId, String solvedacToken) {
        String profileImage = finalJsonNode.get("user").get("profileImageUrl").toString();
        String email = finalJsonNode.get("user").get("email").toString();

        Long tier = Long.parseLong(finalJsonNode.get("user").get("tier").toString());
        Tier getTier = tierRepository.findByLevel(tier);


        // member table 에 저장
        Member newMember = new Member();
        newMember.setTier(getTier);
        newMember.setBojId(bojId);
        newMember.setProfileImage(profileImage.substring(1,profileImage.length()-1));
        newMember.setSolveCount(finalJsonNode.get("solved").size());
        newMember.setEmail(email.substring(1,email.length()-1));
        newMember.setExp(0); // 신규회원은 0으로 시작
        newMember.setSolvedacToken(solvedacToken);
        memberRepository.save(newMember);
    }

    private void addSolvingLog(JsonNode finalJsonNode, String bojId) {
        int solvedSize = finalJsonNode.get("solved").size();
        for (int i = 0; i < solvedSize; i++) {
            int problemId = Integer.parseInt(finalJsonNode.get("solved").get(i).get("id").toString());
            String status = finalJsonNode.get("solved").get(i).get("status").toString();
            addProblem(bojId,problemId, status);
        }
    }

    private void addProblem(String bojId, int problemId, String status) {
        Problem problem = problemRepository.findByBojId(problemId).orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND_PROBLEM));
        Optional<Member> member = Optional.ofNullable(memberRepository.findByBojId(bojId));
        member.ifPresent(selectMember->{
            SolvingLog solvingLog = new SolvingLog();
            solvingLog.setMember(selectMember);
            solvingLog.setProblem(problem);
            solvingLog.setStatus(status);
            solvingLog.setCreatedTime(LocalDateTime.now());
            solvingLogRepository.save(solvingLog);
        });
    }

    private void addMemberOrganizaton(JsonNode finalJsonNode, String bojId) {
        int organizationSize = finalJsonNode.get("user").get("organizations").size();
        for (int i = 0; i < organizationSize; i++) {
            //organization 등록
            int organizationId = Integer.parseInt(finalJsonNode.get("user").get("organizations").get(i).get("organizationId").toString());
            String organizationName = finalJsonNode.get("user").get("organizations").get(i).get("name").toString();

            boolean typeFlag = true;
            addOrganization(organizationId, organizationName, typeFlag);
            //memberHasOrganization 등록
            addMemberHasOrganization(bojId, organizationName);
        }
    }

    private void addOrganization(int organizationId, String organizationName, boolean typeFlag) {
        Optional<Organization> organization =  organizationRepository.findByBojId(organizationId);
        //이미 존재하는 organization이면 pass, 아니면 새로 등록
        organization.ifPresentOrElse(selectorganization->{
            log.info("organization already exist!!");
        },()->{
            log.info("new organization");
            Organization newOrganiation = new Organization();
            newOrganiation.setBojId(organizationId);
            newOrganiation.setName(organizationName);
            newOrganiation.setTypeFlag(typeFlag);
            organizationRepository.save(newOrganiation);
        });
    }

    private void addMemberHasOrganization(String bojId, String organizationName) {
        Organization organization = organizationRepository.findByName(organizationName);
        Optional<Member> member = Optional.ofNullable(memberRepository.findByBojId(bojId));
        member.ifPresent(selectMember->{
            MemberHasOrganization memberHasOrganization = new MemberHasOrganization();
            memberHasOrganization.setMember(selectMember);
            memberHasOrganization.setOrganization(organization);
            memberHasOrganizationRepository.save(memberHasOrganization);
        });
    }


    private void addLoginlog(String bojId) {
        Optional<Member> member = Optional.ofNullable(memberRepository.findByBojId(bojId));
        member.ifPresent(selectMember->{
            LoginLog loginLog = new LoginLog();
            loginLog.setMember(selectMember);
            loginLogRepository.save(loginLog);
        });
    }

    private void modifySolvingLog(int prevCount, int curCount, JsonNode finalJsonNode, String bojId) {
        for (int i = prevCount; i < curCount; i++) {
            int problemId = Integer.parseInt(finalJsonNode.get("solved").get(i).get("id").toString());
            String status = finalJsonNode.get("solved").get(i).get("status").toString();
            addProblem(bojId,problemId, status);
        }
    }

    private String checkDay(String bojId) {
        Optional<Member> member = Optional.ofNullable(memberRepository.findByBojId(bojId));
        AtomicReference<String> status = new AtomicReference<>("");
        member.ifPresent(selectMember->{
            String today = LocalDateTime.now().getYear() + "" + LocalDateTime.now().getMonthValue() + "" + LocalDateTime.now().getDayOfMonth() + "";
            String yesterday = LocalDateTime.now().minusDays(1).getYear() + "" + LocalDateTime.now().minusDays(1).getMonthValue() + "" + LocalDateTime.now().minusDays(1).getDayOfMonth() +"";

            // 이전 모든 로그인 로그 기록
            List<LocalDateTime> loginLog = loginLogRepository.findLoginLog(selectMember);

            // 가장 최근 로그인 로그 기록 확인
            LocalDateTime latelyLogin = loginLog.get(loginLog.size()-1);
            String lately = latelyLogin.getYear() + ""+ latelyLogin.getMonthValue() + ""+ latelyLogin.getDayOfMonth() + "";

            // 오늘 이미 방문했었으면 second 리턴
            if(lately==today){
                status.set("second");
            }
            // 오늘 첫 방문이고
            else{
                if(lately.equals(yesterday)){
                    // 어제 방문한 기록이 있으면
                    status.set("visited");
                }else{
                    status.set("first");
                }
            }
        });
        return status.get();
    }
}
