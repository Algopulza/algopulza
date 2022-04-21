package com.algopulza.backend.api.service;

import com.algopulza.backend.api.response.SolvedAcProblemRes;

import java.util.List;

public interface ProblemService {

    void getAndAddProblemList(int start, int end);

}
