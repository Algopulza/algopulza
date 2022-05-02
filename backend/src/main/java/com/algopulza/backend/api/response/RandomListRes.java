package com.algopulza.backend.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import java.util.List;

@ApiModel("RandomListRes")
@Getter
@Setter
@Builder
public class RandomListRes {

    @ApiModelProperty(name = "구현 문제 리스트")
    private List<ProblemRes> simulationList;

    @ApiModelProperty(name = "동적 프로그래밍 문제 리스트")
    private List<ProblemRes> dpList;

    @ApiModelProperty(name = "그래프 문제 리스트")
    private List<ProblemRes> graphList;

    @ApiModelProperty(name = "그리디 문제 리스트")
    private List<ProblemRes> greedyList;

    @ApiModelProperty(name = "정렬 문제 리스트")
    private List<ProblemRes> sortingList;

    @ApiModelProperty(name = "너비 우선 탐색 문제 리스트")
    private List<ProblemRes> bfsList;

    @ApiModelProperty(name = "깊이 우선 탐색 문제 리스트")
    private List<ProblemRes> dfsList;

    @ApiModelProperty(name = "조합론 문제 리스트")
    private List<ProblemRes> combinationList;

    @ApiModelProperty(name = "브론즈 레벨 문제 리스트")
    private List<ProblemRes> bronzeList;

    @ApiModelProperty(name = "실버 레벨 문제 리스트")
    private List<ProblemRes> silverList;

    @ApiModelProperty(name = "골드 레벨 문제 리스트")
    private List<ProblemRes> goldList;

    @ApiModelProperty(name = "플래티넘 레벨 문제 리스트")
    private List<ProblemRes> platinumList;

}
