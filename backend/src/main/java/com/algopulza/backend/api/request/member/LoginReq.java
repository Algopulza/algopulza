package com.algopulza.backend.api.request.member;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@ApiModel("LoginReq")
@Data
public class LoginReq {
    @ApiModelProperty(value = "알고풀자 아이디", required = true)
    private String id;

    @ApiModelProperty(value = "알고풀자 비밀번호", required = true)
    private String password;

}
