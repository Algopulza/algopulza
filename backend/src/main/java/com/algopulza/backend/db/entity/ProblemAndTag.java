package com.algopulza.backend.db.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class ProblemAndTag {

    private Problem problem;

    private List<ProblemHasTag> problemHasTagList;

}
