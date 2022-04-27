package com.algopulza.backend.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@ApiModel("ProblemAndStatusRes")
@Getter
@Setter
public class ProblemAndStatusRes extends ProblemRes {

    @ApiModelProperty(name = "로그인한 유저의 풀이상태", example = "solved")
    private String status;

    public ProblemAndStatusRes(Long problemId, int bojId, String title, String status, Long tierLevel, String tierName, int acceptedCount, double averageTryCount, boolean solvableFlag) {
        super(problemId, bojId, title, tierLevel, tierName, acceptedCount, averageTryCount, solvableFlag);
        this.status = status;
    }

}
