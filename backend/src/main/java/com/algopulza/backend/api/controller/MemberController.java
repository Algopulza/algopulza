package com.algopulza.backend.api.controller;

import com.algopulza.backend.api.request.member.*;
import com.algopulza.backend.api.response.MemberRes;
import com.algopulza.backend.api.response.TokenRes;
import com.algopulza.backend.api.service.MemberService;
import com.algopulza.backend.common.exception.InvalidException;
import com.algopulza.backend.common.exception.handler.ErrorCode;
import com.algopulza.backend.common.exception.handler.ErrorResponse;
import com.algopulza.backend.common.model.BaseResponseBody;
import com.algopulza.backend.common.model.ResponseMessage;
import com.algopulza.backend.config.jwt.JwtTokenProvider;
import com.algopulza.backend.config.jwt.RoleType;
import com.fasterxml.jackson.core.JsonProcessingException;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

import static com.algopulza.backend.common.model.ResponseMessage.REFRESH_TOKEN;

@Slf4j
@Api(value = "회원관리 API", tags = {"member"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/members")
public class MemberController {
    private final MemberService memberService;
    private final JwtTokenProvider tokenProvider;

    @PostMapping("/join")
    @ApiOperation(value = "회원가입", notes = "회원가입 요청 API 입니다.")
    @ApiResponses({@ApiResponse(code = 201, message = ResponseMessage.JOIN_SUCCESS),
            @ApiResponse(code = 400, message = ResponseMessage.BAD_REQUEST, response = ErrorResponse.class),
            @ApiResponse(code = 401, message = ResponseMessage.UNAUTHORIZED, response = ErrorResponse.class),
            @ApiResponse(code = 403, message = ResponseMessage.ACCESS_DENIED, response = ErrorResponse.class),
            @ApiResponse(code = 404, message = ResponseMessage.NOT_FOUND, response = ErrorResponse.class)})
    public ResponseEntity<BaseResponseBody> addMember(JoinReq joinReq) {
        // 회원정보 저장
        memberService.addMember(joinReq);

        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.CREATED, ResponseMessage.JOIN_SUCCESS));
    }

    @PostMapping("/login")
    @ApiOperation(value = "로그인", notes = "로그인 요청 API 입니다.")
    @ApiResponses({@ApiResponse(code = 201, message = ResponseMessage.LOGIN_SUCCESS),
            @ApiResponse(code = 400, message = ResponseMessage.BAD_REQUEST, response = ErrorResponse.class),
            @ApiResponse(code = 401, message = ResponseMessage.UNAUTHORIZED, response = ErrorResponse.class),
            @ApiResponse(code = 403, message = ResponseMessage.ACCESS_DENIED, response = ErrorResponse.class),
            @ApiResponse(code = 404, message = ResponseMessage.NOT_FOUND, response = ErrorResponse.class)})
    public ResponseEntity<BaseResponseBody> login(LoginReq loginReq) {
        // 회원정보 저장
        MemberRes memberRes = memberService.login(loginReq);

        // jwt token 발급
        String token = memberService.createToken(memberRes.getMemberId(), RoleType.USER);
        String refreshToken = memberService.createRefreshToken(memberRes.getMemberId());
        TokenRes tokenRes = new TokenRes(token, refreshToken);

        Map<String, Object> result = new HashMap<>();
        result.put("member", memberRes);
        result.put("token", tokenRes);
        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.CREATED, ResponseMessage.LOGIN_SUCCESS, result));
    }

    @PostMapping("/checkId")
    @ApiOperation(value = "algopulza ID 중복검사", notes = "algopulza ID 중복검사 요청 API 입니다.")
    @ApiResponses({@ApiResponse(code = 201, message = ResponseMessage.CHECK_DUPLICATE_ID),
            @ApiResponse(code = 400, message = ResponseMessage.BAD_REQUEST, response = ErrorResponse.class),
            @ApiResponse(code = 401, message = ResponseMessage.UNAUTHORIZED, response = ErrorResponse.class),
            @ApiResponse(code = 403, message = ResponseMessage.ACCESS_DENIED, response = ErrorResponse.class),
            @ApiResponse(code = 404, message = ResponseMessage.NOT_FOUND, response = ErrorResponse.class)})
    public ResponseEntity<BaseResponseBody> checkId(@RequestBody @ApiParam(value = "algopulza ID", required = true) String id) {
        boolean isPresent =  memberService.checkId(id);
        log.info("isPresent: {}", isPresent);
        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.CREATED, ResponseMessage.CHECK_DUPLICATE_ID, isPresent));
    }

    @PostMapping("/extractBojId")
    @ApiOperation(value = "이미지에서 백준 id 추출하기", notes = "이미지에서 백준 ID 추출하는 API 입니다.")
    @ApiResponses({@ApiResponse(code = 200, message = ResponseMessage.GET_BOJID_FROM_IMG_SUCCESS, response = ErrorResponse.class),
            @ApiResponse(code = 400, message = ResponseMessage.BAD_REQUEST, response = ErrorResponse.class),
            @ApiResponse(code = 401, message = ResponseMessage.UNAUTHORIZED, response = ErrorResponse.class),
            @ApiResponse(code = 403, message = ResponseMessage.ACCESS_DENIED, response = ErrorResponse.class),
            @ApiResponse(code = 404, message = ResponseMessage.NOT_FOUND, response = ErrorResponse.class)})
    public ResponseEntity<BaseResponseBody> extractBojIdFromImg(@RequestPart MultipartFile capturedImage) {
        String bojId = memberService.extractBojIdFromImg(capturedImage);
        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.OK, ResponseMessage.GET_BOJID_FROM_IMG_SUCCESS, bojId));
    }

    @ApiOperation(value = "로그아웃",notes = "토큰을 만료 시킨 후 로그아웃한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = ResponseMessage.LOGOUT_SUCCESS),
            @ApiResponse(code = 401, message = ResponseMessage.UNAUTHORIZED, response = ErrorResponse.class),
            @ApiResponse(code = 500, message = ResponseMessage.SERVER_ERROR, response = ErrorResponse.class)
    })
    @GetMapping(value = "/logout/{memberId}")
    public ResponseEntity<BaseResponseBody> logout(@PathVariable Long memberId) {
        memberService.logout(memberId);
        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.OK,ResponseMessage.LOGOUT_SUCCESS));
    }

    @ApiOperation(value = "토큰 재발급 요청", notes = "만료된 accessToken을 refreshToken을 통해 재발급하는 api입니다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = REFRESH_TOKEN, response = TokenRes.class),
            @ApiResponse(code = 401, message = ResponseMessage.UNAUTHORIZED, response = ErrorResponse.class),
            @ApiResponse(code = 403, message = ResponseMessage.INVALID_REFRESH_TOKEN, response = ErrorResponse.class),
            @ApiResponse(code = 500, message = ResponseMessage.SERVER_ERROR, response = ErrorResponse.class)
    })
    @PostMapping(value = "/refresh/{memberId}")
    public ResponseEntity<BaseResponseBody> refreshToken(@PathVariable Long memberId, @RequestParam String refreshToken){
        if(!tokenProvider.validateToken(refreshToken))
            throw new InvalidException(ErrorCode.INVALID_REFRESH_TOKEN);
        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.CREATED,REFRESH_TOKEN,memberService.refreshAccessToken(memberId,refreshToken)));
    }

    @PostMapping("/renewal")
    @ApiOperation(value = "회원정보 갱신", notes = "회원정보 갱신 API 입니다. 문제 풀이 정보가 갱신됩니다.")
    @ApiResponses({@ApiResponse(code = 201, message = ResponseMessage.RENEWAL_MEMBER_INFO),
            @ApiResponse(code = 400, message = ResponseMessage.BAD_REQUEST, response = ErrorResponse.class),
            @ApiResponse(code = 401, message = ResponseMessage.UNAUTHORIZED, response = ErrorResponse.class),
            @ApiResponse(code = 403, message = ResponseMessage.ACCESS_DENIED, response = ErrorResponse.class),
            @ApiResponse(code = 404, message = ResponseMessage.NOT_FOUND, response = ErrorResponse.class)})
    public ResponseEntity<BaseResponseBody> modifyMember(@RequestBody ModifyMemberReq modifyMemberReq) throws JsonProcessingException {
        // 회원정보 갱신
        memberService.modifyMember(modifyMemberReq);
        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.CREATED, ResponseMessage.RENEWAL_MEMBER_INFO));
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

    @PostMapping("/solved")
    @ApiOperation(value = "solved 문제 등록하기", notes = "solved 문제 등록 요청 API 입니다.")
    @ApiResponses({@ApiResponse(code = 201, message = ResponseMessage.POST_SOLVED_PROBLEM_SUCCESS),
            @ApiResponse(code = 400, message = ResponseMessage.BAD_REQUEST, response = ErrorResponse.class),
            @ApiResponse(code = 401, message = ResponseMessage.UNAUTHORIZED, response = ErrorResponse.class),
            @ApiResponse(code = 403, message = ResponseMessage.ACCESS_DENIED, response = ErrorResponse.class),
            @ApiResponse(code = 404, message = ResponseMessage.NOT_FOUND, response = ErrorResponse.class)})
    public ResponseEntity<BaseResponseBody> addSolvedProblem(@RequestBody AddProblemReq addSolvedProblemReq){
        memberService.addSolvedProblem(addSolvedProblemReq);
        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.OK, ResponseMessage.POST_SOLVED_PROBLEM_SUCCESS));
    }

    @PostMapping("/tried")
    @ApiOperation(value = "tried 문제 등록하기", notes = "tried 문제 등록 요청 API 입니다.")
    @ApiResponses({@ApiResponse(code = 201, message = ResponseMessage.POST_TRIED_PROBLEM_SUCCESS),
            @ApiResponse(code = 400, message = ResponseMessage.BAD_REQUEST, response = ErrorResponse.class),
            @ApiResponse(code = 401, message = ResponseMessage.UNAUTHORIZED, response = ErrorResponse.class),
            @ApiResponse(code = 403, message = ResponseMessage.ACCESS_DENIED, response = ErrorResponse.class),
            @ApiResponse(code = 404, message = ResponseMessage.NOT_FOUND, response = ErrorResponse.class)})
    public ResponseEntity<BaseResponseBody> addTriedProblem(@RequestBody AddProblemReq addTriedProblemReq){
        memberService.addTriedProblem(addTriedProblemReq);
        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.OK, ResponseMessage.POST_TRIED_PROBLEM_SUCCESS));
    }

}
