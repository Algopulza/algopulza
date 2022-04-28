package com.algopulza.backend.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@ApiModel("ProblemRes")
@Getter
@Setter
public class ProblemRes {

    @ApiModelProperty(name = "문제 아이디", example = "1")
    private Long problemId;

    @ApiModelProperty(name = "백준 문제 아이디", example = "1")
    private int bojId;

    @ApiModelProperty(name = "문제 제목", example = "1")
    private String title;

    @ApiModelProperty(name = "티어 레벨", example = "1")
    private Long tierLevel;

    @ApiModelProperty(name = "티어 레벨명", example = "1")
    private String tierName;

    @ApiModelProperty(name = "맞은 사람 수", example = "1000")
    private int acceptedCount;

    @ApiModelProperty(name = "평균 시도 횟수", example = "10")
    private double averageTryCount;

    @ApiModelProperty(name = "채점 가능 여부", example = "true")
    private boolean solvableFlag;

    @ApiModelProperty(name = "태그")
    private List<TagRes> tagList;

    public ProblemRes(Long problemId, int bojId, String title, Long tierLevel, String tierName, int acceptedCount, double averageTryCount, boolean solvableFlag) {
        this.problemId = problemId;
        this.bojId = bojId;
        this.title = title;
        this.tierLevel = tierLevel;
        this.tierName = tierName;
        this.acceptedCount = acceptedCount;
        this.averageTryCount = averageTryCount;
        this.solvableFlag = solvableFlag;
    }

}
