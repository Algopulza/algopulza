package com.algopulza.backend.api.service;

import com.algopulza.backend.api.request.AddDetailSolvedProblemReq;
import com.algopulza.backend.api.response.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AnalysisService {

    List<LanguageAnalysisRes> getLanguageAnalysisList(Long memberId);

    List<SolvedCountByYearRes> getSolvedCountAnalysisList(Long memberId);

    SolvingLogStatisticsRes getSolvingLogStatistics(Long memberId);

}
