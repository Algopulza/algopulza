package com.algopulza.backend.api.service;

import com.algopulza.backend.api.response.*;
import com.algopulza.backend.db.entity.ProblemAndTag;
import com.algopulza.backend.db.entity.Tag;
import org.springframework.data.domain.Pageable;

import java.util.HashMap;
import java.util.List;

public interface ProblemService {

    void getAndAddProblemList(int start, int end);

    ProblemAndTag getEntitiesFromSolvedAcProblemRes(SolvedAcProblemRes solvedAcProblemRes, HashMap<Integer, Tag> tagMapBybojTagId);

    List<ProblemAndStatusRes> getProblemList(Long memberId, Pageable pageable);

    List<ProblemRes> getProblemListByKeyword(String keyword);

    ProblemRes getOneRandomProblem();

    RandomListRes getRandomProblemList();

    List<ProblemRes> getRandomProblemListByCondition(int type, int condition, int count);

}
