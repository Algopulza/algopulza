package com.algopulza.backend.api.request.member;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@ApiModel("ModifyMemberReq")
@Data
public class ModifyMemberReq {

    @ApiModelProperty(value = "백준 아이디", required = true)
    private String bojId;

    @ApiModelProperty(value = "solvedacToken", required = true)
    private String solvedacToken;

}
