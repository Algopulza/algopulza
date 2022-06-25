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

    @ApiModelProperty(name = "알고풀자 아이디", example = "algopulza")
    private String algopluzaId;

    @ApiModelProperty(name = "백준 아이디", example = "baekjoon")
    private String bojId;

    @ApiModelProperty(name = "프로필 사진 URI", example = "http://url...")
    private String profileImage;

    @ApiModelProperty(name = "티어 레벨", example = "1")
    private Long level;

    @ApiModelProperty(name = "티어명", example = "Bronze")
    private String tierName;

    @ApiModelProperty(name = "티어레벨", example = "2")
    private int tierLevel;

    @ApiModelProperty(name = "경험치", example = "3")
    private int exp;

}
