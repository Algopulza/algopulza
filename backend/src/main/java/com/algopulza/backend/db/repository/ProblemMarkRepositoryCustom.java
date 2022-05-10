package com.algopulza.backend.db.repository;

import com.algopulza.backend.api.response.ProblemMarkRes;

import java.util.List;

public interface ProblemMarkRepositoryCustom {

    List<ProblemMarkRes> findProblemByTypeFlag(Long memberId, int typeFlag);

}
