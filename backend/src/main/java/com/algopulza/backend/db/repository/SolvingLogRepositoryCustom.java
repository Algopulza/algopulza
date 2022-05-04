package com.algopulza.backend.db.repository;

import com.algopulza.backend.db.entity.Member;
import com.algopulza.backend.db.entity.Problem;
import com.algopulza.backend.db.entity.SolvingLog;

import java.util.List;

public interface SolvingLogRepositoryCustom {
    List<Problem> findByMember(Member member);


    SolvingLog findByProblem(Member member, Problem problem);
}
