package com.algopulza.backend.api.service;

import com.algopulza.backend.api.request.member.*;
import com.algopulza.backend.api.response.*;
import com.algopulza.backend.common.exception.DuplicatedException;
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
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.*;
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
                if(selectMember.getSolveCount()!=curSolveCount){
                    selectMember.setSolveCount(curSolveCount);
                }

                // login_log 추가
                addLoginlog(selectMember.getId());

                // 경험치 관리
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
    public void addMember(JoinReq joinReq){
        String id = joinReq.getId();
        String password = getPasswordEncoder(joinReq.getPassword());
        String bojId = extractBojIdFromImg(joinReq.getCapturedImage());
        String solvedProblems = joinReq.getSolvedProblems();
        String triedProblems = joinReq.getTriedProblems();

        // DB에서 bojId로 가입한 회원 있는지 확인
        Optional<Member> member = Optional.ofNullable(memberRepository.findByBojId(bojId));
        if(member.isPresent()){  // 존재하면 예외 처리
            throw new DuplicatedException(ErrorCode.DUPLICATE_BOJID);
        }

        // 존재하지 않다면 회원가입 정상 진행
        // bojId 이용해서 백준 사이트 회원정보 가져오기
        JsonNode finalJsonNode = getMemberBybojId(bojId);

        // 회원가입
        addNewMember(finalJsonNode, bojId, id, password);

        // 풀었던 문제 번호 등록 (solved + tried)
        AddProblemReq addProblemReq = new AddProblemReq();
        addProblemReq.setBojId(bojId);
        addProblemReq.setProblems(solvedProblems);
        addSolvedProblem(addProblemReq);

        addProblemReq.setProblems(triedProblems);
        addTriedProblem(addProblemReq);
    }

    @Override
    public void collectSolvingLog(Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND_MEMBER));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.add("Accept", "*/*");
        headers.add("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36");

        HttpEntity<String> entity = new HttpEntity<String>("", headers);

        RestTemplate restTemplate = new RestTemplate();
        String response;
        try {
            response = restTemplate.exchange("https://www.acmicpc.net/user/" + member.getBojId(), HttpMethod.GET, entity, String.class).getBody();
        } catch (Exception e) {
            throw new NotFoundException(ErrorCode.NOT_FOUND_MEMBER);
        }

        Elements problemListElements = Jsoup.parse(response).getElementsByClass("problem-list");

        if (problemListElements.size() < 2) {
            return;
        }

        List<SolvingLog> solvingLogList = solvingLogRepository.findByMember(member);
        // solving_log에 이미 존재하는 문제의 BOJ ID
        Map<Integer, Integer> existBojProblemId = new HashMap<>();
        for (int index = 0; index < solvingLogList.size(); index++) {
            existBojProblemId.put(solvingLogList.get(index).getProblem().getBojId(), index);
        }

        // 푼 문제 리스트
        Elements problemElements = problemListElements.get(0).children();
        for (Element problemElement : problemElements) {
            setSolvingLogList(Integer.parseInt(problemElement.text()), "solved", member, existBojProblemId, solvingLogList);
        }

        // 맞았지만 만접을 받지 못한 문제, 시도했지만 맞지 못한 문제
        problemElements = problemListElements.get(1).children();
        for (Element problemElement : problemElements) {
            setSolvingLogList(Integer.parseInt(problemElement.text()), "tried", member, existBojProblemId, solvingLogList);
        }

        if (problemListElements.size() >= 3) {
            problemElements = problemListElements.get(2).children();
            for (Element problemElement : problemElements) {
                setSolvingLogList(Integer.parseInt(problemElement.text()), "tried", member, existBojProblemId, solvingLogList);
            }
        }

        solvingLogRepository.saveAll(solvingLogList);
    }

    private void setSolvingLogList(int bojProblemId, String status, Member member, Map<Integer, Integer> existBojProblemId, List<SolvingLog> solvingLogList) {
        SolvingLog solvingLog;
        Problem problem;
        if (existBojProblemId.containsKey(bojProblemId)) {
            solvingLog = solvingLogList.get(existBojProblemId.get(bojProblemId));
            problem = solvingLog.getProblem();
        } else {
            solvingLog = new SolvingLog();
            problem = problemRepository.findByBojId(bojProblemId).orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND_PROBLEM));
        }

        solvingLog.setMember(member);
        solvingLog.setProblem(problem);
        solvingLog.setStatus(status);
        solvingLog.setUpdatedTime(ZonedDateTime.now().toLocalDateTime());

        if (!existBojProblemId.containsKey(bojProblemId)) {
            solvingLogList.add(solvingLog);
        }
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
    public String extractBojIdFromImg(MultipartFile capturedImage) {
        String imagePath = tempLocation + capturedImage.getOriginalFilename();
        String id = "";
        try {
            FileOutputStream fos = new FileOutputStream(imagePath);
            fos.write(capturedImage.getBytes());
            fos.close();

            ProcessBuilder builder = new ProcessBuilder("python3", PYTHON_PATH, imagePath);
            Process process = builder.start();

//            BufferedReader errOut = new BufferedReader(new InputStreamReader(process.getErrorStream()));
//            while((id=errOut.readLine())!=null){
//                log.error(id);
//            }

            // python 파일 출력 읽기
            BufferedReader stdOut = new BufferedReader(new InputStreamReader(process.getInputStream()));
            id = stdOut.readLine();

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

    private void addNewMember(JsonNode finalJsonNode, String bojId, String id, String password) {
        String profileImage = finalJsonNode.get("profileImageUrl").toString();

        Long tier = Long.parseLong(finalJsonNode.get("tier").toString());
        Optional<Tier> getTier = tierRepository.findById(tier);

        getTier.ifPresentOrElse(selectTier -> {
            // member table 에 저장
            Member newMember = new Member();
            newMember.setAlgopulzaId(id);
            newMember.setAlgopulzaPassword(password);
            newMember.setBojId(bojId);
            newMember.setTier(selectTier);
            newMember.setProfileImage(profileImage.substring(1, profileImage.length() - 1));
            newMember.setSolveCount(Integer.parseInt(finalJsonNode.get("solvedCount").toString()));
            newMember.setExp(2); // 신규회원은 첫방문으로 경험치 2부터 시작
            memberRepository.save(newMember);
        }, () -> {
            new NotFoundException(ErrorCode.NOT_FOUND_TIER);
        });

    }

    private void addProblem(String bojMemberId, int bojProblemId, String status) {
        Problem problem = problemRepository.findByBojId(bojProblemId).orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND_PROBLEM));
        Optional<Member> member = Optional.ofNullable(memberRepository.findByBojId(bojMemberId));
        member.ifPresent(selectMember -> {
            // member가 푼 문제 리스트
            List<Problem> problemList = solvingLogRepository.findProblemByMember(selectMember);

            // 안 풀었던 문제였다면 새로 추가
            if (!problemList.contains(problem)) {
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

    private void addLoginlog(Long id) {
        Optional<Member> member = memberRepository.findById(id);
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
