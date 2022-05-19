package com.algopulza.backend.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("AddSolvingLogReq")
public class AddSolvingLogReq {

    @ApiModelProperty(value = "문제들", required = true)
    private String problems;

}
