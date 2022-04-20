package com.algopulza.backend.api.controller;

import com.algopulza.backend.common.exception.handler.ErrorResponse;
import com.algopulza.backend.api.service.ProblemService;
import com.algopulza.backend.common.model.BaseResponseBody;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;

import io.swagger.annotations.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.algopulza.backend.common.model.ResponseMessage.*;


@RequiredArgsConstructor
@CrossOrigin(origins = {"*"}, methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
        RequestMethod.PATCH, RequestMethod.DELETE, RequestMethod.OPTIONS})
@Api(value = "문제 추천 API", tags = { "problem" })
@RequestMapping("/api/v1/problem")
@RestController
public class ProblemController {

    private final ProblemService problemService;

    @ApiOperation(value = "문제 정보 수집", notes = "리뷰를 수정합니다.")
    @ApiResponses({@ApiResponse(code = 201, message = PUT_PROBLEMS),
            @ApiResponse(code = 400, message = "Invalid Input 오류", response = ErrorResponse.class),
            @ApiResponse(code = 401, message = "권한 인증 오류", response = ErrorResponse.class),
            @ApiResponse(code = 404, message = "Not Found 오류", response = ErrorResponse.class),
            @ApiResponse(code = 500, message = "서버 에러", response = ErrorResponse.class)})
    @PutMapping()
    public ResponseEntity<BaseResponseBody> addProblems() throws JsonProcessingException {


        return ResponseEntity.ok(BaseResponseBody.of(
                HttpStatus.OK, PUT_PROBLEMS, problemService.addProblems(0, 0)));
    }


}
