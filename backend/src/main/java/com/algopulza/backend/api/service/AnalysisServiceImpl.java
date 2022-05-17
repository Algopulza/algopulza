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

}
