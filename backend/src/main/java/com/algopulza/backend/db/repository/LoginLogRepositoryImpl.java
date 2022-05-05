package com.algopulza.backend.db.repository;

import com.algopulza.backend.db.entity.Member;
import com.algopulza.backend.db.entity.QLoginLog;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
public class LoginLogRepositoryImpl implements LoginLogRepositoryCustom{
    private final JPAQueryFactory jpaQueryFactory;

    QLoginLog qLoginLog = QLoginLog.loginLog;

    @Override
    public List<LocalDateTime> findLoginLog(Member member) {
        List<LocalDateTime> loginLog = jpaQueryFactory
                .select(qLoginLog.createdTime)
                .from(qLoginLog)
                .where(qLoginLog.member.eq(member))
                .groupBy(qLoginLog.createdTime.year())
                .groupBy(qLoginLog.createdTime.month())
                .groupBy(qLoginLog.createdTime.dayOfMonth())
                .fetch();
        return loginLog;
    }
}
