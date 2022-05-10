package com.algopulza.backend.db.repository;

import com.algopulza.backend.db.entity.ProblemMark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProblemMarkRepository extends JpaRepository<ProblemMark, Long>, ProblemMarkRepositoryCustom {
}
