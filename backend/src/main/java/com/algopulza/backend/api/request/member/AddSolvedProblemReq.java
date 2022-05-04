package com.algopulza.backend.api.request.member;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@ApiModel("AddSolvedProblemReq")
@Data
public class AddSolvedProblemReq {
    @ApiModelProperty(value = "백준 아이디", required = true)
    private String bojId;

    @ApiModelProperty(value = "solved 상태의 문제들", required = true)
    private String problems;
}
