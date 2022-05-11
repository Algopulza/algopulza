package com.algopulza.backend.api.request.member;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@ApiModel("AddProblemReq")
@Data
public class AddProblemReq {
    @ApiModelProperty(value = "백준 아이디", required = true)
    private String bojId;

    @ApiModelProperty(value = "문제 푼 상태 캡쳐한 Image", required = true)
    private MultipartFile capturedImage;

}
