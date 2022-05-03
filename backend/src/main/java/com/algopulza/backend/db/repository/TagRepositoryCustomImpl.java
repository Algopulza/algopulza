package com.algopulza.backend.db.repository;

import com.algopulza.backend.api.response.TagRes;
import com.algopulza.backend.db.entity.QProblemHasTag;
import com.algopulza.backend.db.entity.QTag;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class TagRepositoryCustomImpl implements TagRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    QTag qTag = QTag.tag;
    QProblemHasTag qProblemHasTag = QProblemHasTag.problemHasTag;

    @Override
    public List<TagRes> findByProblemId(Long problemId) {
        return jpaQueryFactory.select(Projections.constructor(TagRes.class,
                                      qTag.id,
                                      qTag.bojTagId,
                                      qTag.bojKey,
                                      qTag.name,
                                      qTag.shortName))
                              .from(qTag)
                              .join(qProblemHasTag).on(qTag.eq(qProblemHasTag.tag))
                              .where(qProblemHasTag.problem.id.eq(problemId))
                              .fetch();
    }

}
