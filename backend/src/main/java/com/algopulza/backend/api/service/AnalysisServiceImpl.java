package com.algopulza.backend.api.service;

import com.algopulza.backend.api.response.*;
import com.algopulza.backend.db.repository.SolvingLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Transactional
@Service
public class AnalysisServiceImpl implements AnalysisService {

    private final SolvingLogRepository solvingLogRepository;

    @Override
    public List<LanguageAnalysisRes> getLanguageAnalysisList(Long memberId) {
        long totalCount = solvingLogRepository.countByMemberIdAndLanguageIsNotNull(memberId);
        return solvingLogRepository.findLanguageByMemberId(memberId, totalCount);
    }

    @Override
    public List<SolvedCountAnalysisRes> getSolvedCountAnalysisList(Long memberId) {
        return solvingLogRepository.findCountByMemberId(memberId);
    }

    @Override
    public SolvingLogStatisticsRes getSolvingLogStatistics(Long memberId) {
        return solvingLogRepository.findStatisticsByMemberId(memberId);
    }

}
