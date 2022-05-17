package com.algopulza.backend.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import java.time.LocalDateTime;

@ApiModel("AddDetailSolvedProblemReq")
@Getter
@Setter
public class AddDetailSolvedProblemReq {

    @ApiModelProperty(value = "백준 문제 id", required = true)
    private int problemBojId;

    @ApiModelProperty(value = "메모리", required = true)
    private int memory;

    @ApiModelProperty(value = "코드 실행시간", required = true)
    private int runTime;

    @ApiModelProperty(value = "사용언어", required = true)
    private String language;

    @ApiModelProperty(value = "코드 길이", required = true)
    private int codeLength;

    @ApiModelProperty(value = "풀이하는 데 걸린 시간", required = true)
    private int solvingTime;

    @ApiModelProperty(value = "풀이를 제출한 시각", required = true)
    private LocalDateTime submitTime;

}
