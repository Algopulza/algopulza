package com.algopulza.backend.db.repository;

import com.algopulza.backend.db.entity.QProblemHasTag;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Set;

@RequiredArgsConstructor
public class ProblemHasTagRepositoryCustomImpl implements ProblemHasTagRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    QProblemHasTag qProblemHasTag = QProblemHasTag.problemHasTag;

    @Override
    public List<Long> findProblemIdByTagId(Set<Long> tagIdSet) {
        return jpaQueryFactory
                .select(qProblemHasTag.problem.id).distinct()
                .from(qProblemHasTag)
                .where(qProblemHasTag.tag.id.in(tagIdSet))
                .fetch();
    }

}
