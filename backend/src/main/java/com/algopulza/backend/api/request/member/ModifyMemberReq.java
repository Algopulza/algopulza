package com.algopulza.backend.api.request.member;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@ApiModel("ModifyMemberReq")
@Data
public class ModifyMemberReq {

    @ApiModelProperty(value = "회원 이름(백준 아이디)", required = true)
    private String name;

    @ApiModelProperty(value = "solvedacToken", required = true)
    private String solvedacToken;

}
