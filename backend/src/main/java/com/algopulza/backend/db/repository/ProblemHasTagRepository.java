package com.algopulza.backend.db.repository;

import com.algopulza.backend.db.entity.ProblemHasTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProblemHasTagRepository extends JpaRepository<ProblemHasTag, Long> {
}
