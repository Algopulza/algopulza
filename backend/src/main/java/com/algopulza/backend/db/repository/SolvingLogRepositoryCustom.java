package com.algopulza.backend.db.repository;

import com.algopulza.backend.api.response.*;
import com.algopulza.backend.db.entity.*;

import java.util.List;
import java.util.Optional;

public interface SolvingLogRepositoryCustom {

    List<Problem> findByMember(Member member);

    List<SolvingLog> findByProblem(Member member, Problem problem);

    Optional<SolvingLog> findByProblemAndLanguage(Member member, Problem problem, String language);

    List<LanguageAnalysisRes> findLanguageByMemberId(Long memberId, long totalCount);

    List<SolvedCountAnalysisRes> findCountByMemberId(Long memberId);

    SolvingLogStatisticsRes findStatisticsByMemberId(Long memberId);

}
