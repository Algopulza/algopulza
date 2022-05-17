package com.algopulza.backend.db.repository;

import com.algopulza.backend.api.response.ProblemRes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Set;

public interface ProblemRepositoryCustom {

    Page<ProblemRes> findProblemRes(Long memberId, String tierName, Integer tierLevel, String title, List<Long> problemIdList, Pageable pageable);

    List<Long> findAllId();

    ProblemRes findProblemResById(Long memberId, Long id);

    List<Long> findProblemIdByTierNameSet(Set<String> tierNameSet);

    List<Long> findProblemIdByBojTagId(int bojTagId);

    List<Long> findProblemIdByStatus(Long memberId, String status);

    List<ProblemRes> findProblemResByIdSet(Long memberId, Set<Long> idSet);

}
