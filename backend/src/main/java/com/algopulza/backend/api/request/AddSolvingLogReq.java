package com.algopulza.backend.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import java.time.LocalDateTime;

@ApiModel("AddSolvingLogReq")
@Getter
@Setter
public class AddSolvingLogReq {

    @ApiModelProperty(value = "백준 문제 id", required = true, example = "1000")
    private int problemBojId;

    @ApiModelProperty(value = "풀이 상태", required = false, example = "1")
    private int status;

    @ApiModelProperty(value = "메모리", required = false, example = "12000")
    private int memory;

    @ApiModelProperty(value = "코드 실행시간", required = false, example = "150")
    private int runTime;

    @ApiModelProperty(value = "사용언어", required = false, example = "Java")
    private String language;

    @ApiModelProperty(value = "코드 길이", required = false, example = "1500")
    private int codeLength;

    @ApiModelProperty(value = "풀이하는 데 걸린 시간", required = false, example = "30")
    private int solvingTime;

    @ApiModelProperty(value = "풀이를 제출한 시각", required = false, example = "2021-11-08T11:44:30.327959")
    private LocalDateTime submitTime;

}
