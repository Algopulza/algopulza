package com.algopulza.backend.common.exception.handler;

import com.algopulza.backend.common.model.ResponseMessage;
import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum ErrorCode {

    // Common
    BAD_REQUEST(400, "C001", ResponseMessage.BAD_REQUEST),
    DUPLICATE_INPUT_VALUE(400, "C002", ResponseMessage.DUPLICATE_INPUT_VALUE),
    // Auth
    INVALID_REFRESH_TOKEN(401, "M001", ResponseMessage.INVALID_REFRESH_TOKEN),
    NOT_FOUND_MEMBER(404, "M002", ResponseMessage.NOT_FOUND_MEMBER),
    ACCESS_DENIED(403, "M003", ResponseMessage.ACCESS_DENIED);

    private int status;
    private final String code;
    private final String message;

    ErrorCode(final int status, final String code, final String message) {
        this.status = status;
        this.message = message;
        this.code = code;
    }

    public int getStatus() {
        return status;
    }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

}
