package com.algopulza.backend.api.service;

import com.algopulza.backend.api.request.AddDetailSolvedProblemReq;
import com.algopulza.backend.api.response.SolvingLogRes;
import com.algopulza.backend.common.exception.NotFoundException;
import com.algopulza.backend.common.exception.handler.ErrorCode;
import com.algopulza.backend.db.entity.*;
import com.algopulza.backend.db.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.time.ZonedDateTime;
import java.util.*;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class SolvingLogServiceImpl implements SolvingLogService {
    private final SolvingLogRepository solvingLogRepository;
    private final ProblemRepository problemRepository;
    private final MemberRepository memberRepository;

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

    @Override
    public void addSolvingLogFromString(Long memberId, String status, String problemBojIdString) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND_MEMBER));
        StringTokenizer st = new StringTokenizer(problemBojIdString, " ");
        StringBuilder notFoundProblem = new StringBuilder();

        List<SolvingLog> solvingLogList = new LinkedList<>();
        while (st.hasMoreTokens()) {
            int bojProblemId = Integer.parseInt(st.nextToken());
            Problem problem = problemRepository.findByBojId(bojProblemId).orElse(null);

            if (problem == null) {
                notFoundProblem.append(bojProblemId).append(" ");
                continue;
            }

            SolvingLog solvingLog = new SolvingLog();
            solvingLog.setMember(member);
            solvingLog.setProblem(problem);
            solvingLog.setStatus(status);
            solvingLogList.add(solvingLog);
        }

        solvingLogRepository.saveAll(solvingLogList);
    }


    @Override
    public void addSolvingLog(Long memberId, AddDetailSolvedProblemReq addDetailSolvedProblemReq) {
        String status = "solved";
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND_MEMBER));
        Problem problem = problemRepository.findByBojId(addDetailSolvedProblemReq.getProblemBojId())
                                           .orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND_PROBLEM));

        // member가 problem 문제를 language로 푼 기록이 있다면 업데이트, 없다면 새로 추가
        SolvingLog solvingLog = solvingLogRepository.findByProblemAndLanguage(member, problem, addDetailSolvedProblemReq.getLanguage())
                                                    .orElse(new SolvingLog());

        solvingLog.setMember(member);
        solvingLog.setProblem(problem);
        solvingLog.setStatus(status);
        solvingLog.setMemory(addDetailSolvedProblemReq.getMemory());
        solvingLog.setRunTime(addDetailSolvedProblemReq.getRunTime());
        solvingLog.setLanguage(addDetailSolvedProblemReq.getLanguage());
        solvingLog.setCodeLength(addDetailSolvedProblemReq.getCodeLength());
        solvingLog.setSolvingTime(addDetailSolvedProblemReq.getSolvingTime());
        solvingLog.setSubmitTime(addDetailSolvedProblemReq.getSubmitTime());
        solvingLog.setUpdatedTime(ZonedDateTime.now().toLocalDateTime());
        solvingLogRepository.save(solvingLog);
    }

    @Override
    public Page<SolvingLogRes> getSolvingLogList(Long memberId, Pageable pageable) {
        return solvingLogRepository.findByMemberId(memberId, pageable);
    }

}
