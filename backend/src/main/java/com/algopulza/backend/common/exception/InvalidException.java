package com.algopulza.backend.common.exception;

import com.algopulza.backend.common.exception.handler.ErrorCode;

public class InvalidException extends BusinessException {
    private ErrorCode errorCode;

    public InvalidException() {
        super(ErrorCode.BAD_REQUEST);
    }

    public InvalidException(String message) {
        super(message);
    }

    public InvalidException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

    public ErrorCode getErrorCode() {
        return errorCode;
    }

}
