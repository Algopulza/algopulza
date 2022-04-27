package com.algopulza.backend.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@ApiModel("TagRes")
@Getter
@Setter
@Builder
@AllArgsConstructor
public class TagRes {

    @ApiModelProperty(name = "태그 아이디", example = "1")
    private Long tagId;

    @ApiModelProperty(name = "백준 태그 아이디", example = "1")
    private int bojTagId;

    @ApiModelProperty(name = "solved.ac의 태그 아이디", example = "arbitrary_precision")
    private String key;

    @ApiModelProperty(name = "태그 이름", example = "임의 정밀도 / 큰 수 연산")
    private String name;

    @ApiModelProperty(name = "짧은 태그 이름", example = "임의 정밀도 / 큰 수 연산")
    private String shortName;

}
