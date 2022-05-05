package com.algopulza.backend.api.service;

import com.algopulza.backend.api.response.*;
import com.algopulza.backend.db.entity.*;
import org.springframework.data.domain.Pageable;
import org.springframework.web.server.ServerErrorException;

import java.util.List;
import java.util.Map;

public interface ProblemService {

    void getAndAddProblemList(Integer start, Integer end) throws InterruptedException, ServerErrorException;

    void addEntitiesFromSolvedAcProblemRes(SolvedAcProblemRes solvedAcProblemRes, List<Problem> problemList, List<ProblemHasTag> problemHasTagList, Map<Integer, Tag> tagMapByBojTagId);

    List<ProblemAndStatusRes> getProblemList(Long memberId, String tierName, Integer tierLevel, String status, Pageable pageable);

    List<ProblemRes> getProblemListByKeyword(String keyword, Pageable pageable);

    ProblemRes getOneRandomProblem();

    RandomListRes getRandomProblemList();

    List<ProblemRes> getRandomProblemListByCondition(int type, Object condition, int count);

}
