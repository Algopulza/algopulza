package com.algopulza.backend.api.service;

import com.algopulza.backend.api.response.SolvedAcProblemRes;
import com.algopulza.backend.db.entity.ProblemAndTag;
import com.algopulza.backend.db.entity.Tag;

import java.util.HashMap;

public interface ProblemService {

    void getAndAddProblemList(int start, int end);

    ProblemAndTag getEntitiesFromSolvedAcProblemRes(SolvedAcProblemRes solvedAcProblemRes, HashMap<Integer, Tag> tagMapBybojTagId);

}
