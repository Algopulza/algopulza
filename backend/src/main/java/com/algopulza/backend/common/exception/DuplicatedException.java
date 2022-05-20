package com.algopulza.backend.common.exception;

import com.algopulza.backend.common.exception.handler.ErrorCode;

public class DuplicatedException extends BusinessException {
    private ErrorCode errorCode;

    public DuplicatedException() {
        super(ErrorCode.DUPLICATE_INPUT_VALUE);
    }

    public DuplicatedException(String message) {
        super(message);
    }

    public DuplicatedException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

    public ErrorCode getErrorCode() {
        return errorCode;
    }

}
