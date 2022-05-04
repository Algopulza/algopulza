package com.algopulza.backend.db.repository;

import com.algopulza.backend.api.response.ProblemAndStatusRes;
import com.algopulza.backend.api.response.ProblemRes;
import com.algopulza.backend.db.entity.*;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Set;

@RequiredArgsConstructor
public class ProblemRepositoryCustomImpl implements ProblemRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    QProblem qProblem = QProblem.problem;
    QSolvingLog qSolvingLog = QSolvingLog.solvingLog;
    QTier qTier = QTier.tier;
    QProblemHasTag qProblemHasTag = QProblemHasTag.problemHasTag;
    QTag qTag = QTag.tag;

    @Override
    public List<ProblemAndStatusRes> findProblemAndStatusRes(Long memberId, String tierName, Integer tierLevel, String status, Pageable pageable) {
        return jpaQueryFactory.select(Projections.constructor(ProblemAndStatusRes.class,
                                      qProblem.id,
                                      qProblem.bojId,
                                      qProblem.title,
                                      qSolvingLog.status.coalesce("not try"),
                                      qTier.level,
                                      qTier.name,
                                      qProblem.acceptedCount,
                                      qProblem.averageTryCount,
                                      qProblem.solvableFlag
                              ))
                              .from(qProblem)
                              .join(qTier).on(qProblem.tier.eq(qTier))
                              .leftJoin(qSolvingLog).on(qProblem.eq(qSolvingLog.problem))
                              .where(eqTierName(tierName), eqNumberInTierName(tierLevel), eqStatus(status))
                              .orderBy(qProblem.bojId.asc())
                              .offset(pageable.getOffset())
                              .limit(pageable.getPageSize())
                              .fetch();
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

    private BooleanExpression eqStatus(String status) {
        if (StringUtils.hasText(status)) {
            return qSolvingLog.status.eq(status);
        }
        if ("not try".equals(status)) {
            return qSolvingLog.status.isNull();
        }
        return null;
    }

    @Override
    public List<ProblemRes> findProblemResByTitleLike(String keyword, Pageable pageable) {
        return jpaQueryFactory.select(Projections.constructor(ProblemRes.class,
                                      qProblem.id,
                                      qProblem.bojId,
                                      qProblem.title,
                                      qTier.level,
                                      qTier.name,
                                      qProblem.acceptedCount,
                                      qProblem.averageTryCount,
                                      qProblem.solvableFlag
                              ))
                              .from(qProblem)
                              .join(qTier).on(qProblem.tier.eq(qTier))
                              .where(qProblem.title.contains(keyword))
                              .orderBy(qProblem.bojId.asc())
                              .offset(pageable.getOffset())
                              .limit(pageable.getPageSize())
                              .fetch();
    }

    @Override
    public List<Long> findAllId() {
        return jpaQueryFactory.select(qProblem.id).from(qProblem).fetch();
    }

    @Override
    public ProblemRes findProblemResById(Long id) {
        return jpaQueryFactory.select(Projections.constructor(ProblemRes.class,
                                      qProblem.id,
                                      qProblem.bojId,
                                      qProblem.title,
                                      qTier.level,
                                      qTier.name,
                                      qProblem.acceptedCount,
                                      qProblem.averageTryCount,
                                      qProblem.solvableFlag
                              ))
                              .from(qProblem)
                              .join(qTier).on(qProblem.tier.eq(qTier))
                              .where(qProblem.id.eq(id))
                              .fetchOne();
    }

    @Override
    public List<Long> findProblemIdByTierNameSet(Set<String> tierNameSet) {
        return jpaQueryFactory.select(qProblem.id)
                              .from(qProblem)
                              .join(qTier).on(qProblem.tier.eq(qTier))
                              .where(qTier.name.in(tierNameSet))
                              .fetch();
    }

    @Override
    public List<Long> findProblemIdByBojTagId(int bojTagId) {
        return jpaQueryFactory.select(qProblemHasTag.problem.id)
                              .distinct()
                              .from(qProblemHasTag)
                              .leftJoin(qTag).on(qProblemHasTag.tag.eq(qTag))
                              .where(qTag.bojTagId.eq(bojTagId))
                              .fetch();
    }

    @Override
    public List<ProblemRes> findProblemResByIdSet(Set<Long> idSet) {
        return jpaQueryFactory.select(Projections.constructor(ProblemRes.class,
                                      qProblem.id,
                                      qProblem.bojId,
                                      qProblem.title,
                                      qTier.level,
                                      qTier.name,
                                      qProblem.acceptedCount,
                                      qProblem.averageTryCount,
                                      qProblem.solvableFlag
                              ))
                              .from(qProblem)
                              .join(qTier).on(qProblem.tier.eq(qTier))
                              .where(qProblem.id.in(idSet))
                              .fetch();
    }

}
