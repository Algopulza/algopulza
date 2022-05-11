package com.algopulza.backend.db.repository;

import com.algopulza.backend.api.response.ProblemMarkRes;
import com.algopulza.backend.db.entity.QProblem;
import com.algopulza.backend.db.entity.QProblemMark;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class ProblemMarkRepositoryCustomImpl implements ProblemMarkRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;
    private final QProblemMark qProblemMark = QProblemMark.problemMark;
    private final QProblem qProblem = QProblem.problem;

    @Override
    public List<ProblemMarkRes> findProblemByTypeFlag(Long memberId, int typeFlag) {
        return jpaQueryFactory
                .select(Projections.constructor(ProblemMarkRes.class,
                        qProblem.id,
                        qProblem.bojId,
                        qProblem.title
                ))
                .from(qProblemMark)
                .join(qProblem).on(qProblemMark.problem.eq(qProblem))
                .where(qProblemMark.member.id.eq(memberId))
                .orderBy(qProblemMark.createdTime.desc())
                .fetch();
    }

}
