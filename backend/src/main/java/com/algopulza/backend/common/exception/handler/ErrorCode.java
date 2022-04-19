package com.algopulza.backend.common.exception.handler;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum ErrorCode {

    // Common
    INVALID_INPUT_VALUE(400, "C001", "Invalid Input Value"),
    DUPLICATE_INPUT_VALUE(400, "C002", "Duplicate Input Value"),
    // User
    REFRESH_TOKEN_INVALID(403, "U001", "Invalid Refresh Token"),
    MEMBER_NOT_FOUND(404, "U002", "Member Not Found"),
    ACCESS_DENIED(403, "U003", "Access Denied"),
    // Search
    SEARCH_INVALID_VALUE(400, "H001", "Invalid Search Value");

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
