package com.algopulza.backend.db.repository;

import com.algopulza.backend.api.response.ProblemRes;
import com.algopulza.backend.db.entity.*;
import com.querydsl.core.QueryResults;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;

import java.util.List;

@RequiredArgsConstructor
public class ProblemRepositoryCustomImpl implements ProblemRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    QProblem qProblem = QProblem.problem;
    QSolvingLog qSolvingLog = QSolvingLog.solvingLog;
    QTier qTier = QTier.tier;

    @Override
    public List<ProblemRes> findAllByPagination(Long memberId, Pageable pageable) {
        QueryResults<ProblemRes> queryResults = jpaQueryFactory.select(Projections.constructor(ProblemRes.class,
                                                      qProblem.id,
                                                      qProblem.bojId,
                                                      qProblem.title,
                                                      qSolvingLog.status,
                                                      qTier.level,
                                                      qTier.name,
                                                      qProblem.acceptedCount,
                                                      qProblem.averageTryCount,
                                                      qProblem.solvableFlag
                                                ))
                                                .from(qProblem)
                                                .join(qTier).on(qProblem.tier.eq(qTier))
                                                .leftJoin(qSolvingLog).on(qProblem.eq(qSolvingLog.problem))
                                                .orderBy(qProblem.bojId.asc())
                                                .offset(pageable.getOffset())
                                                .limit(pageable.getPageSize())
                                                .fetchResults();
        return queryResults.getResults();
    }

}
