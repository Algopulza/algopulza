package com.algopulza.backend.api.controller;

import com.algopulza.backend.api.service.ProblemService;
import com.algopulza.backend.common.exception.handler.ErrorResponse;
import com.algopulza.backend.common.model.BaseResponseBody;
import com.algopulza.backend.common.model.ResponseMessage;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@Api(value = "문제관리 API", tags = {"problem"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/problems")
public class ProblemController {

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
    @ApiImplicitParams({@ApiImplicitParam(name = "page", dataType = "integer", paramType = "query", defaultValue = "0")})
    @ApiResponses({
            @ApiResponse(code = 200, message = ResponseMessage.GET_PROBLEM_LIST_SUCCESS, response = ErrorResponse.class),
            @ApiResponse(code = 400, message = ResponseMessage.BAD_REQUEST, response = ErrorResponse.class)
    })
    public ResponseEntity<BaseResponseBody> listProblem(
            @RequestParam(value = "tierName", required = false) String tierName,
            @RequestParam(value = "tierLevel", required = false) Integer tierLevel,
            @ApiIgnore @PageableDefault(size = 20) Pageable pageable
    ) {
        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.OK, ResponseMessage.GET_PROBLEM_LIST_SUCCESS, problemService.getProblemList(
                tierName,
                tierLevel,
                pageable
        )));
    }

    @GetMapping("/title")
    @ApiOperation(value = "문제 검색", notes = "제목으로 문제를 검색하는 API 입니다.")
    @ApiImplicitParams({@ApiImplicitParam(name = "page", dataType = "integer", paramType = "query", defaultValue = "0")})
    @ApiResponses({
            @ApiResponse(code = 200, message = ResponseMessage.SEARCH_PROBLEM_SUCCESS, response = ErrorResponse.class),
            @ApiResponse(code = 400, message = ResponseMessage.BAD_REQUEST, response = ErrorResponse.class)
    })
    public ResponseEntity<BaseResponseBody> listProblemByKeyword(@RequestParam String keyword, @ApiIgnore @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.OK, ResponseMessage.SEARCH_PROBLEM_SUCCESS, problemService.getProblemListByKeyword(keyword, pageable)));
    }

    @GetMapping("/random-one")
    @ApiOperation(value = "랜덤 문제 1개 조회", notes = "랜덤으로 문제를 1개 조회하는 API 입니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = ResponseMessage.GET_PROBLEM_SUCCESS, response = ErrorResponse.class),
            @ApiResponse(code = 400, message = ResponseMessage.BAD_REQUEST, response = ErrorResponse.class)
    })
    public ResponseEntity<BaseResponseBody> detailRandomProblem() {
        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.OK, ResponseMessage.GET_PROBLEM_SUCCESS, problemService.getOneRandomProblem()));
    }

    @GetMapping("/random")
    @ApiOperation(value = "랜덤 문제 리스트 조회", notes = "랜덤 문제 리스트를 조회하는 API 입니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = ResponseMessage.GET_PROBLEM_LIST_SUCCESS, response = ErrorResponse.class),
            @ApiResponse(code = 400, message = ResponseMessage.BAD_REQUEST, response = ErrorResponse.class)
    })
    public ResponseEntity<BaseResponseBody> listRandomProblem() {
        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.OK, ResponseMessage.GET_PROBLEM_LIST_SUCCESS, problemService.getRandomProblemList()));
    }

}
