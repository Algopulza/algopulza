package com.algopulza.backend.api.service;

import com.algopulza.backend.api.response.SolvedAcProblemRes;

import java.util.List;

public interface ProblemService {

    public List<SolvedAcProblemRes> getProblemListFromSolvedac(int start, int end);

}
