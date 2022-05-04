package com.algopulza.backend.db.repository;

import com.algopulza.backend.db.entity.Member;
import com.algopulza.backend.db.entity.Problem;
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
    public List<Problem> findByMember(Member member) {
        List<Problem> solvingLogList =
                jpaQueryFactory
                        .select(qSolvingLog.problem)
                        .from(qSolvingLog)
                        .where(qSolvingLog.member.eq(member))
                        .fetch();
        return solvingLogList;
    }

    @Override
    public SolvingLog findByProblem(Member member, Problem problem) {
        SolvingLog solvingLog =
                jpaQueryFactory
                        .select(qSolvingLog)
                        .from(qSolvingLog)
                        .where(qSolvingLog.member.eq(member))
                        .where(qSolvingLog.problem.eq(problem))
                        .fetchOne();
        return solvingLog;
    }
}
