package com.algopulza.backend.api.controller;

import com.algopulza.backend.api.request.member.ModifyMemberReq;
import com.algopulza.backend.api.service.MemberService;
import com.algopulza.backend.common.exception.handler.ErrorResponse;
import com.algopulza.backend.common.model.BaseResponseBody;
import com.algopulza.backend.db.entity.Member;
import com.fasterxml.jackson.core.JsonProcessingException;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "회원관리 API", tags = { "member" })
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/members")
public class MemberController {
    private final MemberService memberService;

    @PostMapping("/signin")
    @ApiOperation(value = "로그인", notes = "로그인 요청 API")
    @ApiResponses({ @ApiResponse(code = 201, message = "성공", response = ErrorResponse.class),
            @ApiResponse(code = 401, message = "인증 실패", response = ErrorResponse.class),
            @ApiResponse(code = 404, message = "게시글 없음", response = ErrorResponse.class),
            @ApiResponse(code = 500, message = "서버 오류", response = ErrorResponse.class) })
    public ResponseEntity<? extends BaseResponseBody> addMember(@RequestBody String solvedacToken) throws JsonProcessingException {
        memberService.addMember(solvedacToken);
        return null;
    }

    @GetMapping("/{memberId}")
    @ApiOperation(value = "회원 정보 가져오기", notes = "id값에 따른 회원 정보 가져오기 요청 API")
    @ApiResponses({ @ApiResponse(code = 200, message = "성공", response = ErrorResponse.class),
            @ApiResponse(code = 401, message = "인증 실패", response = ErrorResponse.class),
            @ApiResponse(code = 404, message = "게시글 없음", response = ErrorResponse.class),
            @ApiResponse(code = 500, message = "서버 오류", response = ErrorResponse.class) })
    public ResponseEntity<? extends  BaseResponseBody> detailMember(@PathVariable("memberId") @ApiParam(value = "유저의 id값", required = true) int memberId){
        Member member = memberService.getMember(memberId);
        return ResponseEntity.status(200).body(BaseResponseBody.of(HttpStatus.OK,"SUCCESS",member));
    }

    @PatchMapping("/update")
    @ApiOperation(value = "회원 정보 수정하기", notes = "회원 정보 수정하기 요청 API")
    @ApiResponses({ @ApiResponse(code = 200, message = "성공", response = ErrorResponse.class),
            @ApiResponse(code = 401, message = "인증 실패", response = ErrorResponse.class),
            @ApiResponse(code = 404, message = "게시글 없음", response = ErrorResponse.class),
            @ApiResponse(code = 500, message = "서버 오류", response = ErrorResponse.class) })
    public ResponseEntity<? extends BaseResponseBody> modifyMember(@RequestBody ModifyMemberReq modifyMemberReq) {
        memberService.modifyMember(modifyMemberReq);
        return ResponseEntity.status(200).body(BaseResponseBody.of(HttpStatus.OK,"SUCCESS"));
    }





}
