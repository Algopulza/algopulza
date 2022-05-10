package com.algopulza.backend.api.service;

import com.algopulza.backend.api.response.LanguageAnalysisRes;

import java.util.List;

public interface AnalysisService {

    List<LanguageAnalysisRes> getLanguageAnalysisList(Long memberId);

}
