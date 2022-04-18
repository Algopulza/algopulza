package com.algopulza.backend.db.repository;

import com.algopulza.backend.db.entity.MemberHasBadge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberHasBadgeRepository extends JpaRepository<MemberHasBadge, Long> {
}
