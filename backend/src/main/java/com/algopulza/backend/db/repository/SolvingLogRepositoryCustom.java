package com.algopulza.backend.db.repository;

import com.algopulza.backend.db.entity.Member;
import com.algopulza.backend.db.entity.SolvingLog;

import java.util.List;

public interface SolvingLogRepositoryCustom {
    List<SolvingLog> findByName(Member member);
}
