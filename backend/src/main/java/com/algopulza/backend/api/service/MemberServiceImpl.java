package com.algopulza.backend.api.service;

import com.algopulza.backend.api.request.member.AddDetailSolvedProblem;
import com.algopulza.backend.api.request.member.AddProblemReq;
import com.algopulza.backend.api.request.member.ModifyMemberReq;
import com.algopulza.backend.api.request.member.ModifyProfileImageReq;
import com.algopulza.backend.api.response.MemberRes;
import com.algopulza.backend.api.response.TokenRes;
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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.StringTokenizer;
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
    private final ProblemRepository problemRepository;
    private final SolvingLogRepository solvingLogRepository;
    private final S3Service s3Service;

    @Value("${solvedac.baseurl}")
    private String SolvedacBaseUrl;

    private static final String PYTHON_PATH = "/ocrId.py";

   @Value("${spring.servlet.multipart.location}")
    public String tempLocation;

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
    public MemberRes addMember(String bojId) {

        // 1. solvedac API 활용해서 member 정보 받아오기
        JsonNode finalJsonNode = getMemberBybojId(bojId);

        // 2. solvedacToken으로 받아온 bojId를 가지고 DB에서 회원 검색
        Optional<Member> member = Optional.ofNullable(memberRepository.findByBojId(bojId));

        member.ifPresentOrElse(selectMember -> {
            // 3-1. DB에 있는 회원이면 정보 갱신
            log.info("member already exist!!");

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
            if(selectMember.getSolveCount()!=curSolveCount){
                selectMember.setSolveCount(curSolveCount);
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
            addNewMember(finalJsonNode, bojId);
        });

        // 4. login_log 추가 (db 유무 상관없이 해야함)
        addLoginlog(bojId);

        Optional<Member> mem = Optional.ofNullable(memberRepository.findByBojId(bojId));
        MemberRes memberRes = getMember(mem.get().getId());

        return memberRes;
    }


    private JsonNode getMemberBybojId(String bojId) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> entity = new HttpEntity<String>("", headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> memberInfo
                = restTemplate.exchange(SolvedacBaseUrl+"/user/show?handle="+bojId, HttpMethod.GET, entity, String.class);

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

        Optional<Member> member = Optional.ofNullable(memberRepository.findByBojId(bojId));
        JsonNode finalJsonNode = getMemberBybojId(bojId);

        member.ifPresent(selectMember->{
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
            if(selectMember.getSolveCount()!=curSolveCount){
                selectMember.setSolveCount(curSolveCount);
            }

        });
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

    @Override
    public void addSolvedProblem(AddProblemReq addSolvedProblemReq) {
        String bojId = addSolvedProblemReq.getBojId();
        String problems = addSolvedProblemReq.getProblems();

        StringTokenizer st = new StringTokenizer(problems, " ");
        while (st.hasMoreTokens()){
            int problemId = Integer.parseInt(st.nextToken());
            addProblem(bojId, problemId, "solved");
        }
    }

    @Override
    public void addTriedProblem(AddProblemReq addTriedProblemReq) {
        String bojId = addTriedProblemReq.getBojId();
        String problems = addTriedProblemReq.getProblems();

        StringTokenizer st = new StringTokenizer(problems, " ");
        while (st.hasMoreTokens()){
            int problemId = Integer.parseInt(st.nextToken());
            addProblem(bojId, problemId, "tried");
        }
    }

    @Override
    public void addDetailSolvedProblem(AddDetailSolvedProblem addDetailSolvedProblem) {
        String status = "solved";
        String bojId = addDetailSolvedProblem.getBojId();
        Problem problem = problemRepository.findByBojId(addDetailSolvedProblem.getProblemBojId()).orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND_PROBLEM));
        Optional<Member> member = Optional.ofNullable(memberRepository.findByBojId(bojId));

        member.ifPresentOrElse(selectMember-> {
            // member가 푼 문제 리스트
            List<Problem> problemList = solvingLogRepository.findByMember(selectMember);

            // 이전에 푼 기록이 없는 문제면
            if(!problemList.contains(problem)){
                SolvingLog solvingLog = new SolvingLog();
                solvingLog.setMember(selectMember);
                solvingLog.setProblem(problem);
                solvingLog.setStatus(status);
                solvingLog.setMemory(addDetailSolvedProblem.getMemory());
                solvingLog.setTime(addDetailSolvedProblem.getTime());
                solvingLog.setLanguage(addDetailSolvedProblem.getLanguage());
                solvingLog.setCodeLength(addDetailSolvedProblem.getCodeLength());
                solvingLog.setSolvingTime(addDetailSolvedProblem.getSolvingTime());
                solvingLogRepository.save(solvingLog);
            }
            // 문제를 푼 기록이 있으면
            else{
                // 상태 확인
                Problem solvedProblem = problemList.get(problemList.indexOf(problem));
                List<SolvingLog> solvingLog = solvingLogRepository.findByProblem(selectMember, solvedProblem);

                if(solvingLog.size()==1 && solvingLog.get(0).getStatus().equals("tried")){
                    solvingLog.get(0).setStatus("solved");
                    solvingLog.get(0).setMemory(addDetailSolvedProblem.getMemory());
                    solvingLog.get(0).setTime(addDetailSolvedProblem.getTime());
                    solvingLog.get(0).setLanguage(addDetailSolvedProblem.getLanguage());
                    solvingLog.get(0).setCodeLength(addDetailSolvedProblem.getCodeLength());
                    solvingLog.get(0).setSolvingTime(addDetailSolvedProblem.getSolvingTime());
                }
                else if (solvingLog.size()==1 && solvingLog.get(0).getStatus().equals("solved")) {
                    String useLanguage = solvingLog.get(0).getLanguage();
                    if(useLanguage==null){ // 사용 언어 등록 안 되어있으면
                        solvingLog.get(0).setMemory(addDetailSolvedProblem.getMemory());
                        solvingLog.get(0).setTime(addDetailSolvedProblem.getTime());
                        solvingLog.get(0).setLanguage(addDetailSolvedProblem.getLanguage());
                        solvingLog.get(0).setCodeLength(addDetailSolvedProblem.getCodeLength());
                        solvingLog.get(0).setSolvingTime(addDetailSolvedProblem.getSolvingTime());
                    }else if(!useLanguage.equals(addDetailSolvedProblem.getLanguage())){ // 이전에 풀었던 언어랑 다른 언어로 푼 경우
                        SolvingLog newSolvingLog = new SolvingLog();
                        newSolvingLog.setMember(selectMember);
                        newSolvingLog.setProblem(problem);
                        newSolvingLog.setStatus(status);
                        newSolvingLog.setMemory(addDetailSolvedProblem.getMemory());
                        newSolvingLog.setTime(addDetailSolvedProblem.getTime());
                        newSolvingLog.setLanguage(addDetailSolvedProblem.getLanguage());
                        newSolvingLog.setCodeLength(addDetailSolvedProblem.getCodeLength());
                        newSolvingLog.setSolvingTime(addDetailSolvedProblem.getSolvingTime());
                        solvingLogRepository.save(newSolvingLog);
                    }
                }
                else if(solvingLog.size()>1){
                    boolean flag = false; // 같은 언어로 푼 경우가 있는지 확인하기 위한 flag
                    for (SolvingLog solved:solvingLog) {
                        if(solved.getLanguage().equals(addDetailSolvedProblem.getLanguage())){
                            flag =true;
                            break;
                        }
                    }

                    if(!flag){ // 같은 언어로 푼 경우가 없다면 새로 추가
                        SolvingLog newSolvingLog = new SolvingLog();
                        newSolvingLog.setMember(selectMember);
                        newSolvingLog.setProblem(problem);
                        newSolvingLog.setStatus(status);
                        newSolvingLog.setMemory(addDetailSolvedProblem.getMemory());
                        newSolvingLog.setTime(addDetailSolvedProblem.getTime());
                        newSolvingLog.setLanguage(addDetailSolvedProblem.getLanguage());
                        newSolvingLog.setCodeLength(addDetailSolvedProblem.getCodeLength());
                        newSolvingLog.setSolvingTime(addDetailSolvedProblem.getSolvingTime());
                         solvingLogRepository.save(newSolvingLog);
                    }
                }
            }
        }, ()-> {
            new NotFoundException(ErrorCode.NOT_FOUND_MEMBER);
        });
    }

    @Override
    public String extractBojIdFromImg(MultipartFile capturedImage) {
        String imagePath = tempLocation + capturedImage.getOriginalFilename();
        String id = "";
        try {
            FileOutputStream fos = new FileOutputStream(imagePath);
            fos.write(capturedImage.getBytes());
            fos.close();

            ProcessBuilder builder = new ProcessBuilder("python3", PYTHON_PATH, imagePath);
            Process process = builder.start();

            System.out.println("imagePath => " + imagePath);

            BufferedReader errOut = new BufferedReader(new InputStreamReader(process.getErrorStream()));
            while((id=errOut.readLine())!=null){
                System.out.println(id);
            }



            // python 파일 출력 읽기
            BufferedReader stdOut = new BufferedReader(new InputStreamReader(process.getInputStream()));
            id = stdOut.readLine();
            log.info("id -> {} ",id);

            if ("fail".equals(id)){
                throw new NotFoundException(ErrorCode.INVALID_IMAGE);
            }

            int exitval = process.waitFor(); // 파이썬 프로세스가 종료될 때까지 기다림
            if(exitval != 0){
                log.error("이미지 프로세스가 비정상적으로 종료되었습니다");
                throw new NotFoundException(ErrorCode.INVALID_IMAGE);
            }


        } catch (IOException | InterruptedException e) {
            throw new RuntimeException(e);
        }

        return id;
    }

    private void addNewMember(JsonNode finalJsonNode, String bojId) {
        String profileImage = finalJsonNode.get("profileImageUrl").toString();

        Long tier = Long.parseLong(finalJsonNode.get("tier").toString());
        Optional<Tier> getTier = tierRepository.findById(tier);

        getTier.ifPresentOrElse(selectTier -> {
            // member table 에 저장
            Member newMember = new Member();
            newMember.setTier(selectTier);
            newMember.setBojId(bojId);
            newMember.setProfileImage(profileImage.substring(1,profileImage.length()-1));
            newMember.setSolveCount(Integer.parseInt(finalJsonNode.get("solvedCount").toString()));
            newMember.setEmail(null);
            newMember.setExp(2); // 신규회원은 첫방문으로 경험치 2부터 시작
            memberRepository.save(newMember);
        }, ()->{
            new NotFoundException(ErrorCode.NOT_FOUND_TIER);
        });

    }

    private void addProblem(String bojId, int problemId, String status) {
        Problem problem = problemRepository.findByBojId(problemId).orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND_PROBLEM));
        Optional<Member> member = Optional.ofNullable(memberRepository.findByBojId(bojId));
        member.ifPresent(selectMember->{
            // member가 푼 문제 리스트
            List<Problem> problemList = solvingLogRepository.findByMember(selectMember);

            // 안 풀었던 문제였다면 새로 추가
            if(!problemList.contains(problem)) {
                SolvingLog solvingLog = new SolvingLog();
                solvingLog.setMember(selectMember);
                solvingLog.setProblem(problem);
                solvingLog.setStatus(status);
                solvingLogRepository.save(solvingLog);
            }
            // 이미 풀었던 문제라면
            else{
                Problem solvedProblem = problemList.get(problemList.indexOf(problem));
                List<SolvingLog> solvingLog = solvingLogRepository.findByProblem(selectMember, solvedProblem);
                if(status.equals("solved") && solvingLog.get(0).getStatus().equals("tried")){
                    solvingLog.get(0).setStatus("solved");
                }
            }
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
            if(lately.equals(today)){
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
