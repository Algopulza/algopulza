package com.algopulza.backend.db.repository;

import com.algopulza.backend.api.response.ProblemAndStatusRes;
import com.algopulza.backend.api.response.ProblemRes;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProblemRepositoryCustom {

    List<ProblemAndStatusRes> findAllByPagination(Long memberId, Pageable pageable);

    List<ProblemRes> findByTitleLike(String keyword);

}
