package com.algopulza.backend.db.repository;

import com.algopulza.backend.api.response.*;
import com.algopulza.backend.db.entity.Member;
import com.algopulza.backend.db.entity.Problem;
import com.algopulza.backend.db.entity.QSolvingLog;
import com.algopulza.backend.db.entity.SolvingLog;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class SolvingLogRepositoryCustomImpl implements  SolvingLogRepositoryCustom{

    private final JPAQueryFactory jpaQueryFactory;

    QSolvingLog qSolvingLog = QSolvingLog.solvingLog;

    @Override
    public List<Problem> findByMember(Member member) {
        return jpaQueryFactory
                .select(qSolvingLog.problem)
                .from(qSolvingLog)
                .where(qSolvingLog.member.eq(member))
                .fetch();
    }

    @Override
    public List<SolvingLog> findByProblem(Member member, Problem problem) {
        return jpaQueryFactory
                .select(qSolvingLog)
                .from(qSolvingLog)
                .where(qSolvingLog.member.eq(member))
                .where(qSolvingLog.problem.eq(problem))
                .fetch();
    }

    @Override
    public List<LanguageAnalysisRes> findLanguageByMemberId(Long memberId, long totalCount) {
        return jpaQueryFactory
                .select(Projections.constructor(LanguageAnalysisRes.class,
                        qSolvingLog.language,
                        qSolvingLog.language.count(),
                        Expressions.asNumber(totalCount)
                ))
                .from(qSolvingLog)
                .where(qSolvingLog.member.id.eq(memberId), qSolvingLog.language.isNotNull())
                .groupBy(qSolvingLog.language)
                .fetch();
    }

    @Override
    public List<SolvedCountAnalysisRes> findCountByMemberId(Long memberId) {
        return jpaQueryFactory
                .select(Projections.constructor(SolvedCountAnalysisRes.class,
                        qSolvingLog.createdTime.year(),
                        qSolvingLog.createdTime.month(),
                        qSolvingLog.count()
                ))
                .from(qSolvingLog)
                .where(qSolvingLog.member.id.eq(memberId))
                .groupBy(qSolvingLog.createdTime.year(), qSolvingLog.createdTime.month())
                .orderBy(qSolvingLog.createdTime.asc())
                .fetch();
    }

    @Override
    public SolvingLogStatisticsRes findStatisticsByMemberId(Long memberId) {
        return jpaQueryFactory
                .select(Projections.constructor(SolvingLogStatisticsRes.class,
                        qSolvingLog.count(),
                        qSolvingLog.codeLength.sum().longValue(),
                        qSolvingLog.solvingTime.sum().longValue()
                ))
                .from(qSolvingLog)
                .where(qSolvingLog.member.id.eq(memberId), qSolvingLog.status.eq("solved"))
                .fetchOne();
    }

}
