package com.algopulza.backend.api.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MyPageRes {

    private List<LanguageAnalysisRes> languageAnalysisList;

    private List<SolvedCountByYearRes> solvedCountAnalysisList;

    private SolvingLogStatisticsRes solvingLogStatistics;

    private List<ProblemMarkRes> markedProblemList;

}
