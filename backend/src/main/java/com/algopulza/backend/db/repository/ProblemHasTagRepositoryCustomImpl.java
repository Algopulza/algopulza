package com.algopulza.backend.db.repository;

import com.algopulza.backend.api.dto.CountDto;
import com.algopulza.backend.api.response.SolvingLogRes;
import com.algopulza.backend.db.entity.*;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Set;

@RequiredArgsConstructor
public class ProblemHasTagRepositoryCustomImpl implements ProblemHasTagRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    QProblemHasTag qProblemHasTag = QProblemHasTag.problemHasTag;
    QTag qTag = QTag.tag;

    @Override
    public List<Long> findProblemIdByTagId(Set<Long> tagIdSet) {
        return jpaQueryFactory.select(qProblemHasTag.problem.id).distinct().from(qProblemHasTag).where(qProblemHasTag.tag.id.in(tagIdSet)).fetch();
    }

    @Override
    public List<CountDto> countProblemByTag() {
        return jpaQueryFactory
                .select(Projections.constructor(CountDto.class,
                        qProblemHasTag.tag.id,
                        qTag.name,
                        qProblemHasTag.problem.count()
                ))
                .from(qProblemHasTag)
                .join(qTag).on(qProblemHasTag.tag.eq(qTag))
                .groupBy(qProblemHasTag.tag)
                .fetch();
    }

}
