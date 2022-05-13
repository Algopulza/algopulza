package com.algopulza.backend.api.request.member;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@ApiModel("CheckIdReq")
@Data
public class CheckIdReq {
    @ApiModelProperty(value = "알고풀자 아이디", required = true)
    private String id;
}
