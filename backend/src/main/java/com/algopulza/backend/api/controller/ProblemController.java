package com.algopulza.backend.api.controller;

import com.algopulza.backend.api.service.ProblemService;
import com.algopulza.backend.common.exception.handler.ErrorResponse;
import com.algopulza.backend.common.model.BaseResponseBody;
import com.algopulza.backend.common.model.ResponseMessage;
import com.algopulza.backend.config.jwt.JwtTokenProvider;
import com.algopulza.backend.config.jwt.JwtUtil;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@Api(value = "문제관리 API", tags = {"problem"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/problems")
public class ProblemController {

    private final JwtTokenProvider tokenProvider;
    private final ProblemService problemService;

    @PutMapping("")
    @ApiOperation(value = "문제 정보 수집하기", notes = "Solved.ac API로 문제 정보를 수집하는 API 입니다. 조건을 입력하지 않으면 전체 문제를 수집합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = ResponseMessage.PUT_PROBLEM_LIST_SUCCESS, response = ErrorResponse.class),
            @ApiResponse(code = 400, message = ResponseMessage.BAD_REQUEST, response = ErrorResponse.class)
    })
    public ResponseEntity<BaseResponseBody> addProblemList(
            @RequestParam(name = "startProblemNumber", required = false) Integer startProblemNumber,
            @RequestParam(name = "endProblemNumber", required = false) Integer endProblemNumber
    ) throws InterruptedException {
        problemService.getAndAddProblemList(startProblemNumber, endProblemNumber);
        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.OK, ResponseMessage.PUT_PROBLEM_LIST_SUCCESS));
    }

    @GetMapping("")
    @ApiOperation(value = "문제 리스트 조회", notes = "문제 리스트를 조회하는 API 입니다. 조건을 입력하지 않으면 전체 문제를 조회합니다.")
    @ApiImplicitParams({@ApiImplicitParam(name = "page", dataType = "integer", paramType = "query", defaultValue = "0"),
            @ApiImplicitParam(name = "size", dataType = "integer", paramType = "query", defaultValue = "5")})
    @ApiResponses({@ApiResponse(code = 200, message = ResponseMessage.GET_PROBLEM_LIST_SUCCESS, response = ErrorResponse.class),
            @ApiResponse(code = 400, message = ResponseMessage.BAD_REQUEST, response = ErrorResponse.class)})
    public ResponseEntity<BaseResponseBody> listProblem(
            @RequestParam(value = "tierName", required = false) String tierName,
            @RequestParam(value = "tierLevel", required = false) Integer tierLevel,
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "tagIds", required = false) String tagIds,
            @ApiIgnore @PageableDefault(size = 5) Pageable pageable
    ) {
        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.OK, ResponseMessage.GET_PROBLEM_LIST_SUCCESS, problemService.getProblemList(tierName, tierLevel, title, tagIds, pageable)));
    }

    @GetMapping("/random-one")
    @ApiOperation(value = "랜덤 문제 1개 조회", notes = "랜덤으로 문제를 1개 조회하는 API 입니다.")
    @ApiResponses({@ApiResponse(code = 200, message = ResponseMessage.GET_PROBLEM_SUCCESS, response = ErrorResponse.class),
            @ApiResponse(code = 400, message = ResponseMessage.BAD_REQUEST, response = ErrorResponse.class)})
    public ResponseEntity<BaseResponseBody> detailRandomProblem(HttpServletRequest request) {
        Long memberId = authenticate(request) ? JwtUtil.getCurrentId() : null;
        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.OK, ResponseMessage.GET_PROBLEM_SUCCESS, problemService.getOneRandomProblem(memberId)));
    }

    @GetMapping("/random")
    @ApiOperation(value = "랜덤 문제 리스트 조회", notes = "랜덤 문제 리스트를 조회하는 API 입니다.")
    @ApiResponses({@ApiResponse(code = 200, message = ResponseMessage.GET_PROBLEM_LIST_SUCCESS, response = ErrorResponse.class),
            @ApiResponse(code = 400, message = ResponseMessage.BAD_REQUEST, response = ErrorResponse.class)})
    public ResponseEntity<BaseResponseBody> listRandomProblem(HttpServletRequest request) {
        Long memberId = authenticate(request) ? JwtUtil.getCurrentId() : null;
        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.OK, ResponseMessage.GET_PROBLEM_LIST_SUCCESS, problemService.getRandomProblemList(memberId)));
    }

    @PostMapping("/{problemId}/mark")
    @ApiOperation(value = "즐겨찾기 목록에 추가", notes = "즐겨찾기로 등록하는 API 입니다.")
    @ApiResponses({@ApiResponse(code = 201, message = ResponseMessage.POST_PROBLEM_MARK),
            @ApiResponse(code = 400, message = ResponseMessage.BAD_REQUEST, response = ErrorResponse.class),
            @ApiResponse(code = 401, message = ResponseMessage.UNAUTHORIZED, response = ErrorResponse.class),
            @ApiResponse(code = 403, message = ResponseMessage.ACCESS_DENIED, response = ErrorResponse.class),
            @ApiResponse(code = 404, message = ResponseMessage.NOT_FOUND, response = ErrorResponse.class)})
    public ResponseEntity<BaseResponseBody> addProblemMark(@PathVariable Long problemId) {
        Long memberId = JwtUtil.getCurrentId();
        problemService.addProblemMark(memberId, problemId, 0);
        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.OK, ResponseMessage.POST_PROBLEM_MARK));
    }

    @DeleteMapping("/{problemId}/mark")
    @ApiOperation(value = "즐겨찾기 목록에서 삭제", notes = "즐겨찾기에서 삭제하는 API 입니다.")
    @ApiResponses({@ApiResponse(code = 200, message = ResponseMessage.DELETE_PROBLEM_MARK),
            @ApiResponse(code = 400, message = ResponseMessage.BAD_REQUEST, response = ErrorResponse.class),
            @ApiResponse(code = 401, message = ResponseMessage.UNAUTHORIZED, response = ErrorResponse.class),
            @ApiResponse(code = 403, message = ResponseMessage.ACCESS_DENIED, response = ErrorResponse.class),
            @ApiResponse(code = 404, message = ResponseMessage.NOT_FOUND, response = ErrorResponse.class)})
    public ResponseEntity<BaseResponseBody> deleteProblemMark(@PathVariable Long problemId) {
        Long memberId = JwtUtil.getCurrentId();
        problemService.deleteProblemMark(memberId, problemId, 0);
        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.OK, ResponseMessage.DELETE_PROBLEM_MARK));
    }

    @GetMapping("/mark")
    @ApiOperation(value = "즐겨찾기 목록 조회", notes = "즐겨찾기 목록을 조회하는 API 입니다.")
    @ApiResponses({@ApiResponse(code = 200, message = ResponseMessage.GET_PROBLEM_MARK),
            @ApiResponse(code = 400, message = ResponseMessage.BAD_REQUEST, response = ErrorResponse.class),
            @ApiResponse(code = 401, message = ResponseMessage.UNAUTHORIZED, response = ErrorResponse.class),
            @ApiResponse(code = 403, message = ResponseMessage.ACCESS_DENIED, response = ErrorResponse.class),
            @ApiResponse(code = 404, message = ResponseMessage.NOT_FOUND, response = ErrorResponse.class)})
    public ResponseEntity<BaseResponseBody> listProblemMark() {
        Long memberId = JwtUtil.getCurrentId();
        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.OK, ResponseMessage.GET_PROBLEM_MARK, problemService.getProblemMarkList(memberId, 0)));
    }

    private boolean authenticate(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");

        String jwt = null;
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            jwt = bearerToken.substring(7);
        }

        if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
            Authentication authentication = tokenProvider.getAuthentication(jwt);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            log.debug("Security Context에 '{}' 인증 정보를 저장했습니다, uri: {}", authentication.getName(), request.getRequestURI());
            return true;
        } else {
            log.debug("유효한 JWT 토큰이 없습니다, uri: {}", request.getRequestURI());
            return false;
        }
    }

}
