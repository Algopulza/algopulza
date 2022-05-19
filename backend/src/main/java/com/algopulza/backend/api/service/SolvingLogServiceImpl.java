package com.algopulza.backend.api.service;

import com.algopulza.backend.api.request.AddSolvingLogReq;
import com.algopulza.backend.api.response.SolvingLogRes;
import com.algopulza.backend.common.exception.NotFoundException;
import com.algopulza.backend.common.exception.handler.ErrorCode;
import com.algopulza.backend.db.entity.*;
import com.algopulza.backend.db.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public void addSolvingLog(Long memberId, AddSolvingLogReq addSolvingLogReq) {
        String status = addSolvingLogReq.getStatus() == 0 ? "tried" : "solved";
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND_MEMBER));
        Problem problem = problemRepository.findByBojId(addSolvingLogReq.getProblemBojId())
                                           .orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND_PROBLEM));

        // member가 problem 문제를 language로 푼 기록이 있다면 업데이트, 없다면 새로 추가
        SolvingLog solvingLog = solvingLogRepository.findByProblemAndLanguage(member, problem, addSolvingLogReq.getLanguage())
                                                    .orElse(new SolvingLog());

        solvingLog.setMember(member);
        solvingLog.setProblem(problem);
        solvingLog.setStatus(status);
        solvingLog.setMemory(addSolvingLogReq.getMemory());
        solvingLog.setRunTime(addSolvingLogReq.getRunTime());
        solvingLog.setLanguage(addSolvingLogReq.getLanguage());
        solvingLog.setCodeLength(addSolvingLogReq.getCodeLength());
        solvingLog.setSolvingTime(addSolvingLogReq.getSolvingTime());
        solvingLog.setSubmitTime(addSolvingLogReq.getSubmitTime());
        solvingLog.setUpdatedTime(ZonedDateTime.now().toLocalDateTime());
        solvingLogRepository.save(solvingLog);
    }

    @Override
    public Page<SolvingLogRes> getSolvingLogList(Long memberId, Pageable pageable) {
        return solvingLogRepository.findByMemberId(memberId, pageable);
    }

}
