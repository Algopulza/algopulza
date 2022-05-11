package com.algopulza.backend.api.request.member;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@ApiModel("JoinReq")
@Data
public class JoinReq {
    @ApiModelProperty(value = "알고풀자 아이디", required = true)
    private String id;

    @ApiModelProperty(value = "알고풀자 비밀번호", required = true)
    private String password;

    @ApiModelProperty(value = "백준 정보 캡쳐 이미지", required = true)
    private MultipartFile capturedImage;

    @ApiModelProperty(value = "백준 문제 풀이 내역(solved)", required = false)
    private String solvedProblems;

    @ApiModelProperty(value = "백준 문제 풀이 내역(tried)", required = false)
    private String triedProblems;
}
