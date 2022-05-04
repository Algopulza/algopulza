package com.algopulza.backend.api.request.member;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.time.LocalDateTime;

@ApiModel("AddDetailSolvedProblem")
@Data
public class AddDetailSolvedProblem {
    @ApiModelProperty(value = "회원의 백준 아이디", required = true)
    private String bojId;

    @ApiModelProperty(value = "백준 문제 id", required = true)
    private int problemBojId;

    @ApiModelProperty(value = "메모리", required = true)
    private int memory;

    @ApiModelProperty(value = "시간", required = true)
    private int time;

    @ApiModelProperty(value = "사용언어", required = true)
    private String language;

    @ApiModelProperty(value = "코드 길이", required = true)
    private int codeLength;


    @ApiModelProperty(value = "문제 푼 시간", required = true)
    private LocalDateTime solvingTime;

}
