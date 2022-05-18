package com.algopulza.backend.db.repository;

import com.algopulza.backend.api.response.*;
import com.algopulza.backend.db.entity.*;
import com.querydsl.core.Tuple;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface SolvingLogRepositoryCustom {

    Page<SolvingLogRes> findByMemberId(Long memberId, Pageable pageable);

    Optional<SolvingLog> findByProblemAndLanguage(Member member, Problem problem, String language);

    List<LanguageAnalysisRes> findLanguageByMemberId(Long memberId, long totalCount);

    List<SolvedCountByYearAndMonthRes> countByStatusAndSubmitDate(Long memberId, String status);

    SolvingLogStatisticsRes findStatisticsByMemberId(Long memberId);

}
