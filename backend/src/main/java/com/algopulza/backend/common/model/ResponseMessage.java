package com.algopulza.backend.common.model;

public class ResponseMessage {

    private ResponseMessage() {
    }

    // Login
    public static final String LOGIN = "로그인 성공";
    public static final String LOGOUT = "로그아웃 성공";
    public static final String GET_USER_INFO = "유저 정보 조회 성공";
    public static final String MODIFY_USER_INFO = "유저 정보 수정 성공";

    // Problem
    public static final String GET_PROBLEM_LIST = "문제 목록 조회 성공";
    public static final String PUT_PROBLEMS = "문제 목록 수집 성공";

}
