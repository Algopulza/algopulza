package com.algopulza.backend.api.controller;

import com.algopulza.backend.api.request.member.ModifyMemberReq;
import com.algopulza.backend.api.service.MemberService;
import com.algopulza.backend.common.model.BaseResponseBody;
import com.algopulza.backend.db.entity.Member;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "회원관리 API", tags = { "member" })
@RestController
@RequestMapping("/api/member")
public class MemberController {
    @Autowired
    MemberService memberService;

    @PostMapping("/signin")
    @ApiOperation(value = "로그인", notes = "로그인 요청 API")
    public ResponseEntity<? extends BaseResponseBody> AddMember(@RequestBody String solvedacToken) {
        return null;
    }

    @GetMapping("/{memberId}")
    @ApiOperation(value = "회원 정보 가져오기", notes = "id값에 따른 회원 정보 가져오기 요청 API")
    public ResponseEntity<? extends  BaseResponseBody> DetailMember(@PathVariable("memberId") @ApiParam(value = "유저의 id값", required = true) int memberId){
        Member member = memberService.GetMember(memberId);
        return ResponseEntity.status(200).body(BaseResponseBody.of(HttpStatus.OK,"SUCCESS",member));
    }

    @PatchMapping("/update")
    @ApiOperation(value = "회원 정보 수정하기", notes = "회원 정보 수정하기 요청 API")
    public ResponseEntity<? extends BaseResponseBody> ModifyMember(@RequestBody ModifyMemberReq modifyMemberReq) {
        memberService.modifyMember(modifyMemberReq);
       return ResponseEntity.status(200).body(BaseResponseBody.of(HttpStatus.OK,"SUCCESS"));
    }





}
