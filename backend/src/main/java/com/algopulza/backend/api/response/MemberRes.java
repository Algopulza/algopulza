package com.algopulza.backend.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@ApiModel("MemberRes")
@Getter
@Setter
@Builder
@AllArgsConstructor
public class MemberRes {

    @ApiModelProperty(name = "회원 아이디", example = "1")
    private Long memberId;

    @ApiModelProperty(name = "백준 아이디", example = "baekjoon")
    private String bojId;

    @ApiModelProperty(name = "프로필 사진 URI", example = "http://url...")
    private String profileImage;

    @ApiModelProperty(name = "이메일", example = "algo@pulza.com")
    private String email;

    @ApiModelProperty(name = "티어 레벨", example = "1")
    private Long level;

    @ApiModelProperty(name = "티어명", example = "Bronze V")
    private String tierName;

    @ApiModelProperty(name = "푼 문제 수", example = "10")
    private int solveCount;

    @ApiModelProperty(name = "경험치", example = "3")
    private int exp;

}
