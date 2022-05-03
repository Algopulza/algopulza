package com.algopulza.backend.db.repository;

import com.algopulza.backend.db.entity.LoginLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoginLogRepository extends JpaRepository<LoginLog, Long>,LoginLogRepositoryCustom {
}
