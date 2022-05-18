package com.algopulza.backend.api.service;

import com.algopulza.backend.api.request.member.*;
import com.algopulza.backend.api.response.*;
import com.algopulza.backend.common.exception.NotFoundException;
import com.algopulza.backend.common.exception.handler.ErrorCode;
import com.algopulza.backend.config.jwt.JwtTokenProvider;
import com.algopulza.backend.config.jwt.RoleType;
import com.algopulza.backend.db.entity.*;
import com.algopulza.backend.db.repository.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;
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
    private final S3Service s3Service;

    @Value("${solvedac.baseurl}")
    private String SolvedacBaseUrl;

   @Value("${spring.servlet.multipart.location}")
    public String tempLocation;

    @Override
    public MemberRes getMember(Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND_MEMBER));
        MemberRes memberRes = MemberRes.builder()
                .memberId(member.getId())
                .algopluzaId(member.getAlgopulzaId())
                .bojId(member.getBojId())
                .profileImage(member.getProfileImage())
                .level(member.getTier().getId())
                .tierName(member.getTier().getName())
                .tierLevel(member.getTier().getLevel())
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
    public LoginMemberRes login(LoginReq loginReq) {
        String id = loginReq.getId();
        String password = loginReq.getPassword();

        Optional<Member> member = memberRepository.findByAlgopulzaId(id);

        member.ifPresentOrElse(selectMember ->{
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            if(encoder.matches(password, selectMember.getAlgopulzaPassword())){
                String bojId = selectMember.getBojId();

                // 비밀번호까지 일치하면 백준 사이트 정보 읽어와 정보 갱신 해주기
                JsonNode finalJsonNode = getMemberBybojId(bojId);

                // 기존 tier와 다르면
                Long tier = Long.parseLong(finalJsonNode.get("tier").toString());
                Optional<Tier> curTier = tierRepository.findById(tier);
                curTier.ifPresentOrElse(selectTier -> {
                    if(selectMember.getTier() != selectTier){
                        selectMember.setTier(selectTier);
                    }
                }, ()-> {
                    new NotFoundException(ErrorCode.NOT_FOUND_TIER);
                });

                // 기존 solveCount와 다르면
                int curSolveCount = Integer.parseInt(finalJsonNode.get("solvedCount").toString());
                if (selectMember.getSolveCount() != curSolveCount) {
                    selectMember.setSolveCount(curSolveCount);
                }

                // 경험치 관리
                // 로그인 로그 확인 -> 오늘 첫 방문이면 +2 , 오늘첫방문+어제도방문이면 +3
                switch (checkDay(member.get().getId())) {
                    case "first":
                        selectMember.setExp(selectMember.getExp() + 2);
                        break;
                    case "visited":
                        selectMember.setExp(selectMember.getExp() + 3);
                        break;
                    case "second":
                        break;
                }

                // login_log 추가
                addLoginlog(selectMember.getId());

            }
            else{
                // 비밀번호 맞지 않을 시
                throw new NotFoundException(ErrorCode.NOT_FOUND_MEMBER);
            }
        }, ()->{
            throw new NotFoundException(ErrorCode.NOT_FOUND_MEMBER);
        });

        MemberRes memberRes = getMember(member.get().getId());
        LoginMemberRes loginMemberRes = LoginMemberRes.builder()
                .memberId(memberRes.getMemberId())
                .algopluzaId(memberRes.getAlgopluzaId())
                .bojId(memberRes.getBojId())
                .build();
        return loginMemberRes;
    }

    @Override
    public boolean checkId(String id) {
        Optional<Member> member = memberRepository.findByAlgopulzaId(id);
        if(member.isPresent()){
            return true;
        }
        return false;
    }

    @Override
    public Long addMember(JoinReq joinReq){
        String id = joinReq.getId();
        String password = getPasswordEncoder(joinReq.getPassword());
        String bojId = joinReq.getBojId();

        // bojId 이용해서 백준 사이트 회원정보 가져오기
        JsonNode finalJsonNode = getMemberBybojId(bojId);

        // 회원가입
        return addNewMember(finalJsonNode, bojId, id, password);
    }

    private String getPasswordEncoder(String password) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String securePassword = encoder.encode(password);
        return securePassword;
    }


    private JsonNode getMemberBybojId(String bojId) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> entity = new HttpEntity<String>("", headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> memberInfo = null;
        try {
            memberInfo  = restTemplate.exchange(SolvedacBaseUrl+"/user/show?handle="+bojId, HttpMethod.GET, entity, String.class);
        }catch (HttpClientErrorException e){
            throw new NotFoundException(ErrorCode.NOT_FOUND_MEMBER);
        }

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
    public String createToken(Long id, RoleType roleType) {
        return tokenProvider.createToken(id.toString(), roleType);
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

    @Override
    public void logout(Long id) {
        // refreshToken 초기화
        Member member = memberRepository.findById(id).orElse(null);
        member.setRefreshToken(null);
        memberRepository.save(member);

    }

    private Long addNewMember(JsonNode finalJsonNode, String bojId, String id, String password) {
        String profileImage = finalJsonNode.get("profileImageUrl").toString();

        Long tierId = Long.parseLong(finalJsonNode.get("tier").toString());
        Tier tier = tierRepository.findById(tierId).orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND_TIER));

        // member table 에 저장
        Member newMember = new Member();
        newMember.setAlgopulzaId(id);
        newMember.setAlgopulzaPassword(password);
        newMember.setBojId(bojId);
        newMember.setTier(tier);
        newMember.setProfileImage(profileImage.substring(1, profileImage.length() - 1));
        newMember.setSolveCount(Integer.parseInt(finalJsonNode.get("solvedCount").toString()));
        newMember.setExp(0);
        memberRepository.save(newMember);

        return newMember.getId();
    }

    private void addLoginlog(Long id) {
        Optional<Member> member = memberRepository.findById(id);
        member.ifPresent(selectMember -> {
            LoginLog loginLog = new LoginLog();
            loginLog.setMember(selectMember);
            loginLogRepository.save(loginLog);
        });
    }

    private String checkDay(Long memberId) {
        Optional<Member> member = memberRepository.findById(memberId);
        AtomicReference<String> status = new AtomicReference<>("");
        member.ifPresent(selectMember -> {
            String today = LocalDateTime.now().getYear() + "" + LocalDateTime.now().getMonthValue() + "" + LocalDateTime.now().getDayOfMonth() + "";
            String yesterday = LocalDateTime.now().minusDays(1).getYear() + "" + LocalDateTime.now().minusDays(1)
                                                                                              .getMonthValue() + "" + LocalDateTime.now().minusDays(1)
                                                                                                                                   .getDayOfMonth() + "";

            // 이전 모든 로그인 로그 기록
            List<LocalDateTime> loginLog = loginLogRepository.findLoginLog(selectMember);
            if (loginLog.size() == 0) {
                status.set("first");
            } else {
                // 가장 최근 로그인 로그 기록 확인
                LocalDateTime latelyLogin = loginLog.get(loginLog.size() - 1);
                String lately = latelyLogin.getYear() + "" + latelyLogin.getMonthValue() + "" + latelyLogin.getDayOfMonth() + "";

                // 오늘 이미 방문했었으면 second 리턴
                if (lately.equals(today)) {
                    status.set("second");
                }
                // 오늘 첫 방문이고
                else {
                    if (lately.equals(yesterday)) {
                        // 어제 방문한 기록이 있으면
                        status.set("visited");
                    } else {
                        status.set("first");
                    }
                }
            }
        });
        return status.get();
    }
}
