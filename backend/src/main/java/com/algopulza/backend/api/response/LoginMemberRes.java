package com.algopulza.backend.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@ApiModel("LoginMemberRes")
@Getter
@Setter
@Builder
@AllArgsConstructor
public class LoginMemberRes {
    @ApiModelProperty(name = "회원 아이디", example = "1")
    private Long memberId;

    @ApiModelProperty(name = "알고풀자 아이디", example = "algopulza")
    private String algopluzaId;

    @ApiModelProperty(name = "백준 아이디", example = "baekjoon")
    private String bojId;

}
