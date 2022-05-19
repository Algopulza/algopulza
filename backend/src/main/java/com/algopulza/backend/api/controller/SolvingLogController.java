package com.algopulza.backend.api.controller;

import com.algopulza.backend.api.request.AddSolvingLogReq;
import com.algopulza.backend.api.service.SolvingLogService;
import com.algopulza.backend.common.exception.handler.ErrorResponse;
import com.algopulza.backend.common.model.BaseResponseBody;
import com.algopulza.backend.common.model.ResponseMessage;
import com.algopulza.backend.config.jwt.JwtUtil;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;


@Api(value = "풀이기록 관리 API", tags = {"solving-log"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/solving-log")
public class SolvingLogController {

    private final SolvingLogService solvingLogService;

    @PostMapping("")
    @ApiOperation(value = "풀이기록 추가", notes = "풀이기록 등록 요청 API 입니다.")
    @ApiResponses({@ApiResponse(code = 201, message = ResponseMessage.POST_DETAIL_SOLVED_PROBLEM_SUCCESS),
            @ApiResponse(code = 400, message = ResponseMessage.BAD_REQUEST, response = ErrorResponse.class),
            @ApiResponse(code = 401, message = ResponseMessage.UNAUTHORIZED, response = ErrorResponse.class),
            @ApiResponse(code = 403, message = ResponseMessage.ACCESS_DENIED, response = ErrorResponse.class),
            @ApiResponse(code = 404, message = ResponseMessage.NOT_FOUND, response = ErrorResponse.class)})
    public ResponseEntity<BaseResponseBody> addDetailSolvingLog(@RequestBody AddSolvingLogReq addSolvingLogReq) {
        Long memberId = JwtUtil.getCurrentId();
        solvingLogService.addSolvingLog(memberId, addSolvingLogReq);
        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.CREATED, ResponseMessage.POST_DETAIL_SOLVED_PROBLEM_SUCCESS));
    }

    @GetMapping("")
    @ApiOperation(value = "풀이 기록 조회", notes = "풀이 기록을 조회하는 API 입니다.")
    @ApiImplicitParams({@ApiImplicitParam(name = "page", dataType = "integer", paramType = "query", defaultValue = "0"),
            @ApiImplicitParam(name = "size", dataType = "integer", paramType = "query", defaultValue = "5")})
    @ApiResponses({@ApiResponse(code = 200, message = ResponseMessage.GET_SOLVING_LOG_SUCCESS),
            @ApiResponse(code = 400, message = ResponseMessage.BAD_REQUEST, response = ErrorResponse.class),
            @ApiResponse(code = 401, message = ResponseMessage.UNAUTHORIZED, response = ErrorResponse.class),
            @ApiResponse(code = 403, message = ResponseMessage.ACCESS_DENIED, response = ErrorResponse.class),
            @ApiResponse(code = 404, message = ResponseMessage.NOT_FOUND, response = ErrorResponse.class)})
    public ResponseEntity<BaseResponseBody> listSolvingLog(@ApiIgnore @PageableDefault(size = 5) Pageable pageable) {
        Long memberId = JwtUtil.getCurrentId();
        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.OK, ResponseMessage.GET_SOLVING_LOG_SUCCESS, solvingLogService.getSolvingLogList(memberId, pageable)));
    }

}
