package com.algopulza.backend.api.request.member;


import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

@Data
public class ModifyMemberReq {
    @ApiModelProperty(value = "id",required = true)
    private int id;

    @ApiModelProperty(value = "변경할 profileImage", required = true)
    private MultipartFile profileImage;
}
