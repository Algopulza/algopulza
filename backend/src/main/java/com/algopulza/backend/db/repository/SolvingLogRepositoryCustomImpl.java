package com.algopulza.backend.db.repository;

import com.algopulza.backend.api.response.*;
import com.algopulza.backend.db.entity.Member;
import com.algopulza.backend.db.entity.Problem;
import com.algopulza.backend.db.entity.QSolvingLog;
import com.algopulza.backend.db.entity.SolvingLog;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
public class SolvingLogRepositoryCustomImpl implements  SolvingLogRepositoryCustom{

    private final JPAQueryFactory jpaQueryFactory;

    QSolvingLog qSolvingLog = QSolvingLog.solvingLog;

    @Override
    public List<Problem> findProblemByMember(Member member) {
        return jpaQueryFactory
                .select(qSolvingLog.problem)
                .from(qSolvingLog)
                .where(qSolvingLog.member.eq(member))
                .fetch();
    }

    @Override
    public List<SolvingLogRes> findByMemberId(Long memberId, Pageable pageable) {
        return jpaQueryFactory
                .select(Projections.constructor(SolvingLogRes.class,
                        qSolvingLog.problem.id,
                        qSolvingLog.problem.bojId,
                        qSolvingLog.problem.title,
                        qSolvingLog.status,
                        qSolvingLog.language,
                        qSolvingLog.memory,
                        qSolvingLog.runTime
                ))
                .from(qSolvingLog)
                .where(qSolvingLog.member.id.eq(memberId))
                .orderBy(qSolvingLog.submitTime.desc(), qSolvingLog.updatedTime.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
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
    public Optional<SolvingLog> findByProblemAndLanguage(Member member, Problem problem, String language) {
        return Optional.ofNullable(jpaQueryFactory
                .select(qSolvingLog)
                .from(qSolvingLog)
                .where(qSolvingLog.member.eq(member), qSolvingLog.problem.eq(problem), eqLanguage(language))
                .fetchOne());
    }

    private BooleanExpression eqLanguage(String language) {
        if (StringUtils.hasText(language)) {
            if ("null".equals(language)) {
                // language가 null인 값들을 찾는다.
                return qSolvingLog.language.isNull();
            }
            // language가 null이거나 language인 값들을 찾는다.
            return qSolvingLog.language.eq(language).or(qSolvingLog.language.isNull());
        }
        // language 조건을 적용하지 않는다.
        return null;
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
