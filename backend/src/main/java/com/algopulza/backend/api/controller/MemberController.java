package com.algopulza.backend.api.controller;

import com.algopulza.backend.api.request.member.ModifyMemberReq;
import com.algopulza.backend.api.request.member.ModifyProfileImageReq;
import com.algopulza.backend.api.response.MemberRes;
import com.algopulza.backend.api.service.MemberService;
import com.algopulza.backend.common.exception.handler.ErrorResponse;
import com.algopulza.backend.common.model.BaseResponseBody;
import com.algopulza.backend.common.model.ResponseMessage;
import com.fasterxml.jackson.core.JsonProcessingException;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "회원관리 API", tags = {"member"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/members")
public class MemberController {
    private final MemberService memberService;

    @PostMapping("")
    @ApiOperation(value = "로그인", notes = "로그인 요청 API 입니다. 첫 로그인이라면 회원정보 저장도 진행합니다.")
    @ApiResponses({@ApiResponse(code = 201, message = ResponseMessage.LOGIN_SUCCESS),
            @ApiResponse(code = 400, message = ResponseMessage.BAD_REQUEST, response = ErrorResponse.class),
            @ApiResponse(code = 401, message = ResponseMessage.UNAUTHORIZED, response = ErrorResponse.class),
            @ApiResponse(code = 403, message = ResponseMessage.ACCESS_DENIED, response = ErrorResponse.class),
            @ApiResponse(code = 404, message = ResponseMessage.NOT_FOUND, response = ErrorResponse.class)})
    public ResponseEntity<BaseResponseBody> addMember(@RequestHeader String solvedacToken) throws JsonProcessingException {
        // 회원정보 저장
        String algopulzaToken = memberService.addMember(solvedacToken);
        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.CREATED, ResponseMessage.LOGIN_SUCCESS, algopulzaToken));
    }

    @PostMapping("/renewal")
    @ApiOperation(value = "회원정보 갱신", notes = "회원정보 갱신 API 입니다. 문제 풀이 정보가 갱신됩니다.")
    @ApiResponses({@ApiResponse(code = 201, message = ResponseMessage.LOGIN_SUCCESS),
            @ApiResponse(code = 400, message = ResponseMessage.BAD_REQUEST, response = ErrorResponse.class),
            @ApiResponse(code = 401, message = ResponseMessage.UNAUTHORIZED, response = ErrorResponse.class),
            @ApiResponse(code = 403, message = ResponseMessage.ACCESS_DENIED, response = ErrorResponse.class),
            @ApiResponse(code = 404, message = ResponseMessage.NOT_FOUND, response = ErrorResponse.class)})
    public ResponseEntity<BaseResponseBody> modifyMember(@RequestBody ModifyMemberReq modifyMemberReq) throws JsonProcessingException {
        // 회원정보 갱신
        memberService.modifyMember(modifyMemberReq);
        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.CREATED, ResponseMessage.LOGIN_SUCCESS));
    }


    @GetMapping("/{memberId}")
    @ApiOperation(value = "회원 정보 조회하기", notes = "회원 id 값으로 회원 정보 조회 API 입니다.")
    @ApiResponses({@ApiResponse(code = 200, message = ResponseMessage.GET_MEMBER_INFO_SUCCESS, response = ErrorResponse.class),
            @ApiResponse(code = 400, message = ResponseMessage.BAD_REQUEST, response = ErrorResponse.class),
            @ApiResponse(code = 401, message = ResponseMessage.UNAUTHORIZED, response = ErrorResponse.class),
            @ApiResponse(code = 403, message = ResponseMessage.ACCESS_DENIED, response = ErrorResponse.class),
            @ApiResponse(code = 404, message = ResponseMessage.NOT_FOUND, response = ErrorResponse.class)})
    public ResponseEntity<BaseResponseBody> detailMember(@PathVariable("memberId") @ApiParam(value = "회원 id 값", required = true) Long memberId) {
        MemberRes memberRes = memberService.getMember(memberId);
        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.OK, ResponseMessage.GET_MEMBER_INFO_SUCCESS, memberRes));
    }

    @PatchMapping("/profileImage")
    @ApiOperation(value = "회원 프로필 이미지 수정하기", notes = "회원 프로필 이미지 수정 API 입니다.")
    @ApiResponses({@ApiResponse(code = 200, message = ResponseMessage.MODIFY_MEMBER_INFO_SUCCESS, response = ErrorResponse.class),
            @ApiResponse(code = 400, message = ResponseMessage.BAD_REQUEST, response = ErrorResponse.class),
            @ApiResponse(code = 401, message = ResponseMessage.UNAUTHORIZED, response = ErrorResponse.class),
            @ApiResponse(code = 403, message = ResponseMessage.ACCESS_DENIED, response = ErrorResponse.class),
            @ApiResponse(code = 404, message = ResponseMessage.NOT_FOUND, response = ErrorResponse.class)})
    public ResponseEntity<BaseResponseBody> modifyProfileImage(@RequestBody ModifyProfileImageReq modifyProfileImageReq) {
        memberService.modifyProfileImage(modifyProfileImageReq);
        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.OK, ResponseMessage.MODIFY_MEMBER_INFO_SUCCESS));
    }
}
