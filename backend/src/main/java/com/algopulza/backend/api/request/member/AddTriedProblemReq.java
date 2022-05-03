package com.algopulza.backend.api.request.member;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@ApiModel("AddTriedProblemReq")
@Data
public class AddTriedProblemReq {
    @ApiModelProperty(value = "백준 아이디", required = true)
    private String bojId;

    @ApiModelProperty(value = "tried 상태의 문제들", required = true)
    private String problems;
}
