package com.algopulza.backend.db.repository;

import com.algopulza.backend.db.entity.Member;
import com.algopulza.backend.db.entity.SolvingLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SolvingLogRepository extends JpaRepository<SolvingLog, Long>, SolvingLogRepositoryCustom {

    long countByMemberIdAndLanguageIsNotNull(Long memberId);

    List<SolvingLog> findByMember(Member member);

}
