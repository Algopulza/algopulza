package com.algopulza.backend.db.repository;

import com.algopulza.backend.api.response.LanguageAnalysisRes;
import com.algopulza.backend.api.response.SolvedCountAnalysisRes;
import com.algopulza.backend.db.entity.*;

import java.util.List;

public interface SolvingLogRepositoryCustom {

    List<Problem> findByMember(Member member);

    List<SolvingLog> findByProblem(Member member, Problem problem);

    List<LanguageAnalysisRes> findLanguageByMemberId(Long memberId, long totalCount);

    List<SolvedCountAnalysisRes> findCountByMemberId(Long memberId);

}
