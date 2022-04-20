package com.algopulza.backend.api.service;

import com.fasterxml.jackson.core.JsonProcessingException;

public interface ProblemService {

    public String addProblems(Integer start, Integer end) throws JsonProcessingException;
}
