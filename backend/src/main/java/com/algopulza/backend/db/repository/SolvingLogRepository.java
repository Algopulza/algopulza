package com.algopulza.backend.db.repository;

import com.algopulza.backend.db.entity.SolvingLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SolvingLogRepository extends JpaRepository<SolvingLog, Long> {
}
