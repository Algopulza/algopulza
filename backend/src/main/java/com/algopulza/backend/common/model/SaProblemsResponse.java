package com.algopulza.backend.common.model;

import io.swagger.annotations.ApiModel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@ApiModel("SaProblemsResponse")
@Data
public class SaProblemsResponse {

    private Integer problemId;

    private String titleKo;

    private List<SaProblemTitleResponse> titles;

    private String isSolvable;

    private String isPartial;

    private Integer acceptedUserCount;

    private Integer level;

    private Integer votedUserCount;

    private String sprout;

    private Double averageTries;

    private String official;

    private List<SaTagResponse> tags;
}
