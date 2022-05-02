package com.algopulza.backend.db.repository;

import com.algopulza.backend.db.entity.Member;
import com.algopulza.backend.db.entity.QSolvingLog;
import com.algopulza.backend.db.entity.SolvingLog;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class SolvingLogRepositoryCustomImpl implements  SolvingLogRepositoryCustom{

    private final JPAQueryFactory jpaQueryFactory;

    QSolvingLog qSolvingLog = QSolvingLog.solvingLog;

    @Override
    public List<SolvingLog> findByName(Member member) {
        List<SolvingLog> solvingLogList =
                jpaQueryFactory
                        .select(qSolvingLog)
                        .from(qSolvingLog)
                        .where(qSolvingLog.member.eq(member))
                        .fetch();
        return solvingLogList;
    }
}
