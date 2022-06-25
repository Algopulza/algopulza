package com.algopulza.backend.db.repository;

import com.algopulza.backend.api.response.ProblemRes;
import com.algopulza.backend.db.entity.*;
import com.querydsl.core.types.*;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Set;

@RequiredArgsConstructor
public class ProblemRepositoryCustomImpl implements ProblemRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    QProblem qProblem = QProblem.problem;
    QTier qTier = QTier.tier;
    QProblemHasTag qProblemHasTag = QProblemHasTag.problemHasTag;
    QTag qTag = QTag.tag;
    QSolvingLog qSolvingLog = QSolvingLog.solvingLog;
    QProblemMark qProblemMark = QProblemMark.problemMark;

    /**
     * 즐겨찾기 문제로 표시되어있는지 여부 반환
     */
    private Expression<Boolean> isMarked(Long memberId) {
        // memberId가 없을때(비회원)는 무조건 false로 반환
        if (memberId == null) {
            return Expressions.asBoolean(false);
        }
        return ExpressionUtils.as(
                JPAExpressions.select(qProblemMark.count().eq(1L))
                              .from(qProblemMark)
                              .where(qProblemMark.problem.eq(qProblem))
                              .where(qProblemMark.member.id.eq(memberId))
                              .where(qProblemMark.typeFlag.eq(0))
                , "markFlag"
        );
    }

    private BooleanExpression eqTierName(String tierName) {
        if (StringUtils.hasText(tierName)) {
            return qTier.name.eq(tierName);
        }
        return null;
    }

    private BooleanExpression eqNumberInTierName(Integer tierLevel) {
        if (tierLevel != null && tierLevel >= 1 && tierLevel <= 5) {
            return qTier.level.eq(tierLevel);
        }
        return null;
    }

    private BooleanExpression containTitle(String title) {
        if (StringUtils.hasText(title)) {
            return qProblem.title.contains(title);
        }
        return null;
    }

    private BooleanExpression inId(List<Long> problemIdList) {
        if (problemIdList == null) {
            return null;
        }
        return qProblem.id.in(problemIdList);
    }

    @Override
    public Page<ProblemRes> findProblemRes(Long memberId, String tierName, Integer tierLevel, String title, List<Long> problemIdList, Pageable pageable) {
        // data query
        List<ProblemRes> content = jpaQueryFactory.select(Projections.constructor(ProblemRes.class,
                                      qProblem.id,
                                      qProblem.bojId,
                                      qProblem.title,
                                      qTier.level,
                                      qTier.name,
                                      qProblem.acceptedCount,
                                      qProblem.averageTryCount,
                                      isMarked(memberId)
                              )).distinct()
                              .from(qProblem)
                              .join(qTier).on(qProblem.tier.eq(qTier))
                              .where(eqTierName(tierName), eqNumberInTierName(tierLevel), containTitle(title), inId(problemIdList))
                              .orderBy(qProblem.bojId.asc())
                              .offset(pageable.getOffset())
                              .limit(pageable.getPageSize())
                              .fetch();

        // count query
        JPAQuery<Problem> countQuery = jpaQueryFactory
                .select(qProblem)
                .from(qProblem)
                .join(qTier).on(qProblem.tier.eq(qTier))
                .where(eqTierName(tierName), eqNumberInTierName(tierLevel), containTitle(title), inId(problemIdList));

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchCount);
    }

    @Override
    public List<Long> findAllId() {
        return jpaQueryFactory.select(qProblem.id).from(qProblem).fetch();
    }

    @Override
    public ProblemRes findProblemResById(Long memberId, Long id) {
        return jpaQueryFactory
                .select(Projections.constructor(ProblemRes.class,
                        qProblem.id,
                        qProblem.bojId,
                        qProblem.title,
                        qTier.level,
                        qTier.name,
                        qProblem.acceptedCount,
                        qProblem.averageTryCount,
                        isMarked(memberId))
                )
                .from(qProblem)
                .join(qTier).on(qProblem.tier.eq(qTier))
                .where(qProblem.id.eq(id))
                .fetchOne();
    }

    @Override
    public List<Long> findProblemIdByTierNameSet(Set<String> tierNameSet) {
        return jpaQueryFactory
                .select(qProblem.id)
                .from(qProblem)
                .join(qTier).on(qProblem.tier.eq(qTier))
                .where(qTier.name.in(tierNameSet))
                .fetch();
    }

    @Override
    public List<Long> findProblemIdByBojTagId(int bojTagId) {
        return jpaQueryFactory
                .select(qProblemHasTag.problem.id).distinct()
                .from(qProblemHasTag)
                .leftJoin(qTag).on(qProblemHasTag.tag.eq(qTag))
                .where(qTag.bojTagId.eq(bojTagId))
                .fetch();
    }

    @Override
    public List<ProblemRes> findProblemResByIdSet(Long memberId, Set<Long> idSet) {
        return jpaQueryFactory
                .select(Projections.constructor(ProblemRes.class,
                        qProblem.id,
                        qProblem.bojId,
                        qProblem.title,
                        qTier.level,
                        qTier.name,
                        qProblem.acceptedCount,
                        qProblem.averageTryCount,
                        isMarked(memberId))
                )
                .from(qProblem)
                .join(qTier).on(qProblem.tier.eq(qTier))
                .where(qProblem.id.in(idSet))
                .fetch();
    }

}
