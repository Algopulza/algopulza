package com.algopulza.backend.db.repository;

import com.algopulza.backend.api.response.ProblemMarkRes;
import com.algopulza.backend.db.entity.*;

import java.util.List;
import java.util.Optional;

public interface ProblemMarkRepositoryCustom {

    List<ProblemMarkRes> findProblemByTypeFlag(Long memberId, int typeFlag);

    Optional<ProblemMark> findByMemberAndProblemAndTypeFlag(Member member, Problem problem, int typeFlag);

}
