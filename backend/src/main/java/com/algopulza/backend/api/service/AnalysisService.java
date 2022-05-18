package com.algopulza.backend.api.service;

import com.algopulza.backend.api.response.*;

import java.util.List;

public interface AnalysisService {

    List<LanguageAnalysisRes> getLanguageAnalysisList(Long memberId);

    List<SolvedCountByYearRes> getSolvedCountAnalysisList(Long memberId);

    SolvingLogStatisticsRes getSolvingLogStatistics(Long memberId);

}
