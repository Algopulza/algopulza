package com.algopulza.backend.api.request.member;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@ApiModel("AddProblemReq")
@Data
public class AddMemberReq {
    @ApiModelProperty(value = "아이디", required = true)
    private String id;

    @ApiModelProperty(value = "비밀번호", required = true)
    private String password;

    @ApiModelProperty(value = "백준 아이디",required = false)
    private String bojId;
}
