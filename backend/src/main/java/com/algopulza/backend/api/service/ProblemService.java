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

    List<ProblemRes> getProblemList(Long memberId, String tierName, Integer tierLevel, String title, String tagIds, Pageable pageable);

    ProblemRes getOneRandomProblem(Long memberId);

    RandomListRes getRandomProblemList(Long memberId);

    List<ProblemRes> getRandomSolvedProblemList(Long memberId);

    List<ProblemRes> getRandomProblemListByCondition(Long memberId, int type, Object condition, int count);

    void addProblemMark(Long memberId, Long problemId, int typeFlag);

    void deleteProblemMark(Long memberId, Long problemId, int typeFlag);

    List<ProblemMarkRes> getProblemMarkList(Long memberId, int typeFlag);

}
