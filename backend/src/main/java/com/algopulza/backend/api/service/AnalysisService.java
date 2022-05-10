package com.algopulza.backend.api.service;

import com.algopulza.backend.api.response.LanguageAnalysisRes;
import com.algopulza.backend.api.response.SolvedCountAnalysisRes;

import java.util.List;

public interface AnalysisService {

    List<LanguageAnalysisRes> getLanguageAnalysisList(Long memberId);

    List<SolvedCountAnalysisRes> getSolvedCountAnalysisList(Long memberId);

}
