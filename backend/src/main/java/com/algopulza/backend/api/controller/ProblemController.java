package com.algopulza.backend.api.controller;

import com.algopulza.backend.api.service.ProblemService;
import com.algopulza.backend.common.exception.handler.ErrorResponse;
import com.algopulza.backend.common.model.BaseResponseBody;
import com.algopulza.backend.common.model.ResponseMessage;
import com.fasterxml.jackson.core.JsonProcessingException;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "문제관리 API", tags = {"problem"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/problems")
public class ProblemController {

    private final ProblemService problemService;

    @PutMapping("")
    @ApiOperation(value = "문제 정보 수집하기", notes = "Solved.ac API로 문제 정보를 수집하는 API 입니다.")
    @ApiResponses({@ApiResponse(code = 200, message = ResponseMessage.PUT_PROBLEM_LIST_SUCCESS, response = ErrorResponse.class),
            @ApiResponse(code = 400, message = ResponseMessage.BAD_REQUEST, response = ErrorResponse.class),
            @ApiResponse(code = 401, message = ResponseMessage.UNAUTHORIZED, response = ErrorResponse.class),
            @ApiResponse(code = 403, message = ResponseMessage.ACCESS_DENIED, response = ErrorResponse.class),
            @ApiResponse(code = 404, message = ResponseMessage.NOT_FOUND, response = ErrorResponse.class)})
    public ResponseEntity<BaseResponseBody> addProblems() throws JsonProcessingException {
        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.OK, ResponseMessage.PUT_PROBLEM_LIST_SUCCESS, problemService.addProblems(0, 0)));
    }


}
