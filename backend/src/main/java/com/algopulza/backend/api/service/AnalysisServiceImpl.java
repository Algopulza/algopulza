package com.algopulza.backend.api.service;

import com.algopulza.backend.api.request.AddDetailSolvedProblemReq;
import com.algopulza.backend.api.response.*;
import com.algopulza.backend.common.exception.NotFoundException;
import com.algopulza.backend.common.exception.handler.ErrorCode;
import com.algopulza.backend.db.entity.*;
import com.algopulza.backend.db.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.*;

@RequiredArgsConstructor
@Transactional
@Service
public class AnalysisServiceImpl implements AnalysisService {

    private final SolvingLogRepository solvingLogRepository;
    private final ProblemRepository problemRepository;
    private final MemberRepository memberRepository;

    @Override
    public List<LanguageAnalysisRes> getLanguageAnalysisList(Long memberId) {
        long totalCount = solvingLogRepository.countByMemberIdAndLanguageIsNotNull(memberId);
        return solvingLogRepository.findLanguageByMemberId(memberId, totalCount);
    }

    @Override
    public List<SolvedCountByYearRes> getSolvedCountAnalysisList(Long memberId) {
        // [{"year": 2022, "month": 1, "solvedCount": 10}, ...] 형태로 조회
        List<SolvedCountByYearAndMonthRes> solvedCountByYearAndMonthResList = solvingLogRepository.countByStatusAndSubmitDate(memberId, "solved");

        // [{"year": 2022, }, ...] 형태로 변환
        Map<Integer, int[]> yearToSolvedCountMap = new HashMap<>();
        List<SolvedCountByYearRes> solvedCountAnalysisList = new LinkedList<>();

        for (SolvedCountByYearAndMonthRes solvedCountByYearAndMonthRes : solvedCountByYearAndMonthResList) {
            int year = solvedCountByYearAndMonthRes.getYear();
            int month = solvedCountByYearAndMonthRes.getMonth();
            long solvedCount = solvedCountByYearAndMonthRes.getSolvedCount();

            if (yearToSolvedCountMap.containsKey(year)) {
                yearToSolvedCountMap.get(year)[month - 1] = (int) solvedCount;
            } else {
                int[] solvedCountArray = new int[12];
                solvedCountArray[month - 1] = (int) solvedCount;
                SolvedCountByYearRes solvedCountByYearRes = new SolvedCountByYearRes(year, solvedCountArray);

                solvedCountAnalysisList.add(solvedCountByYearRes);
                yearToSolvedCountMap.put(year, solvedCountArray);
            }
        }

        return solvedCountAnalysisList;
    }

    @Override
    public SolvingLogStatisticsRes getSolvingLogStatistics(Long memberId) {
        return solvingLogRepository.findStatisticsByMemberId(memberId);
    }

    @Override
    public void addDetailSolvedProblem(Long memberId, AddDetailSolvedProblemReq addDetailSolvedProblemReq) {
        String status = "solved";
        Member member = memberRepository.findById(memberId)
                                        .orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND_MEMBER));
        Problem problem = problemRepository.findByBojId(addDetailSolvedProblemReq.getProblemBojId())
                                           .orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND_PROBLEM));

        // language 정보가 없다면 language가 null값인 정보로 조회
        if (addDetailSolvedProblemReq.getLanguage() == null) {
            addDetailSolvedProblemReq.setLanguage("null");
        }

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
