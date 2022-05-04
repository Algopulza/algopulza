package com.algopulza.backend.db.repository;

import com.algopulza.backend.db.entity.MemberHasOrganization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberHasOrganizationRepository extends JpaRepository<MemberHasOrganization, Long> {
}
