package com.algopulza.backend.api.response;

import io.swagger.annotations.ApiModel;
import lombok.Data;

import java.util.List;

@ApiModel("SolvedAcProblemRes")
@Data
public class SolvedAcProblemRes {

    private Integer problemId;

    private String titleKo;

    private Boolean isSolvable;

    private Boolean isPartial;

    private Integer acceptedUserCount;

    private Long level;

    private Integer votedUserCount;

    private Boolean sprout;

    private Boolean givesNoRating;

    private Boolean isLevelLocked;

    private Double averageTries;

    private Boolean official;

    private List<SolvedAcTagRes> tags;

}
