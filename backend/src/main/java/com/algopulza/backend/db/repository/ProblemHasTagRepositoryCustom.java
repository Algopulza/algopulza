package com.algopulza.backend.db.repository;

import com.algopulza.backend.api.dto.CountDto;

import java.util.List;
import java.util.Set;

public interface ProblemHasTagRepositoryCustom {

    List<Long> findProblemIdByTagId(Set<Long> tagIdSet);

    List<CountDto> countProblemByTag();

}
