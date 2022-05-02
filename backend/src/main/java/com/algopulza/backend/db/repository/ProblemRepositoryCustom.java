package com.algopulza.backend.db.repository;

import com.algopulza.backend.api.response.ProblemAndStatusRes;
import com.algopulza.backend.api.response.ProblemRes;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Set;

public interface ProblemRepositoryCustom {

    List<ProblemAndStatusRes> findProblemAndStatusResByMemberId(Long memberId, Pageable pageable);

    List<ProblemRes> findProblemResByTitleLike(String keyword);

    List<Long> findAllId();

    ProblemRes findProblemResById(Long id);

    List<Long> findProblemIdByLevelRange(int levelStartValue, int levelEndValue);

    List<Long> findProblemIdByBojTagId(int bojTagId);

    List<ProblemRes> findProblemResByIdSet(Set<Long> idSet);

}
