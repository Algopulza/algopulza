package com.algopulza.backend.api.controller;

import com.algopulza.backend.api.service.AnalysisService;
import com.algopulza.backend.common.exception.handler.ErrorResponse;
import com.algopulza.backend.common.model.BaseResponseBody;
import com.algopulza.backend.common.model.ResponseMessage;
import com.algopulza.backend.config.jwt.JwtUtil;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "분석 정보 API", tags = {"analysis"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/analysis")
public class AnalysisController {

    private final AnalysisService analysisService;

    @GetMapping("/languages")
    @ApiOperation(value = "사용 언어 비율 조회", notes = "풀이 시 사용한 언어의 비율을 조회하는 API 입니다.")
    @ApiResponses({@ApiResponse(code = 201, message = ResponseMessage.GET_ANALYSIS_LANGUAGE_SUCCESS),
            @ApiResponse(code = 400, message = ResponseMessage.BAD_REQUEST, response = ErrorResponse.class),
            @ApiResponse(code = 401, message = ResponseMessage.UNAUTHORIZED, response = ErrorResponse.class),
            @ApiResponse(code = 403, message = ResponseMessage.ACCESS_DENIED, response = ErrorResponse.class),
            @ApiResponse(code = 404, message = ResponseMessage.NOT_FOUND, response = ErrorResponse.class)})
    public ResponseEntity<BaseResponseBody> listLanguageAnalysis() {
        Long memberId = JwtUtil.getCurrentId();
        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.OK, ResponseMessage.GET_ANALYSIS_LANGUAGE_SUCCESS, analysisService.getLanguageAnalysisList(memberId)));
    }

    @GetMapping("/solved-count")
    @ApiOperation(value = "월별 문제 풀이 개수 조회", notes = "연도별, 월별 문제 풀이 개수를 조회하는 API 입니다.")
    @ApiResponses({@ApiResponse(code = 201, message = ResponseMessage.GET_ANALYSIS_SOLVED_COUNT_SUCCESS),
            @ApiResponse(code = 400, message = ResponseMessage.BAD_REQUEST, response = ErrorResponse.class),
            @ApiResponse(code = 401, message = ResponseMessage.UNAUTHORIZED, response = ErrorResponse.class),
            @ApiResponse(code = 403, message = ResponseMessage.ACCESS_DENIED, response = ErrorResponse.class),
            @ApiResponse(code = 404, message = ResponseMessage.NOT_FOUND, response = ErrorResponse.class)})
    public ResponseEntity<BaseResponseBody> listSolvedCountAnalysis() {
        Long memberId = JwtUtil.getCurrentId();
        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.OK, ResponseMessage.GET_ANALYSIS_SOLVED_COUNT_SUCCESS, analysisService.getSolvedCountAnalysisList(memberId)));
    }

    @GetMapping("/statistics")
    @ApiOperation(value = "풀이기록 통계 조회", notes = "총 푼 문제 수, 총 코드 길이, 문제 풀이에 들인 총 시간을 조회하는 API 입니다.")
    @ApiResponses({@ApiResponse(code = 201, message = ResponseMessage.GET_SOLVING_LOG_STATISTICS_SUCCESS),
            @ApiResponse(code = 400, message = ResponseMessage.BAD_REQUEST, response = ErrorResponse.class),
            @ApiResponse(code = 401, message = ResponseMessage.UNAUTHORIZED, response = ErrorResponse.class),
            @ApiResponse(code = 403, message = ResponseMessage.ACCESS_DENIED, response = ErrorResponse.class),
            @ApiResponse(code = 404, message = ResponseMessage.NOT_FOUND, response = ErrorResponse.class)})
    public ResponseEntity<BaseResponseBody> detailSolvingLogTotal() {
        Long memberId = JwtUtil.getCurrentId();
        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.OK, ResponseMessage.GET_SOLVING_LOG_STATISTICS_SUCCESS, analysisService.getSolvingLogStatistics(memberId)));
    }

}
