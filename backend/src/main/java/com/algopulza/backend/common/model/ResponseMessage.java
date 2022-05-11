package com.algopulza.backend.common.model;

public class ResponseMessage {

    private ResponseMessage() {
    }

    // Common
    public static final String SERVER_ERROR =  "서버 에러";
    public static final String BAD_REQUEST = "유효하지 않은 요청";
    public static final String DUPLICATE_INPUT_VALUE = "중복된 입력값";
    public static final String NOT_FOUND = "유효하지 않은 리소스 요청";
    public static final String INTERRUPTED = "서버 interrupt 오류";

    // Auth
    public static final String REFRESH_TOKEN = "토큰 재발급 성공";
    public static final String INVALID_REFRESH_TOKEN = "유효하지 않은 리프레시 토큰";
    public static final String UNAUTHORIZED = "인증되지 않은 회원";
    public static final String ACCESS_DENIED = "접근권한 없음";
    public static final String LOGIN_SUCCESS = "로그인 성공";
    public static final String LOGIN_FAIL = "로그인 실패";
    public static final String LOGOUT_SUCCESS = "로그아웃 성공";
    public static final String LOGOUT_FAIL = "로그아웃 실패";

    // Member
    public static final String NOT_FOUND_MEMBER = "존재하지 않는 회원";
    public static final String GET_MEMBER_INFO_SUCCESS = "회원 정보 조회 성공";
    public static final String GET_MEMBER_INFO_FAIL = "회원 정보 조회 실패";
    public static final String MODIFY_MEMBER_INFO_SUCCESS = "회원 정보 수정 성공";
    public static final String MODIFY_MEMBER_INFO_FAIL = "회원 정보 수정 실패";
    public static final String RENEWAL_MEMBER_INFO = "회원 정보 갱신 성공";
    public static final String POST_DETAIL_SOLVED_PROBLEM_SUCCESS = "solved한 문제 세부 정보 넣기 성공";

    // Problem
    public static final String GET_PROBLEM_LIST_SUCCESS = "문제 목록 조회 성공";
    public static final String GET_PROBLEM_SUCCESS = "문제 조회 성공";
    public static final String PUT_PROBLEM_LIST_SUCCESS = "문제 목록 수집 성공";
    public static final String SEARCH_PROBLEM_SUCCESS = "문제 검색 성공";
    public static final String NOT_FOUND_PROBLEM = "존재하지 않는 문제";
    public static final String POST_PROBLEM_MARK = "풀어볼 문제에 추가 성공";
    public static final String GET_PROBLEM_MARK = "풀어볼 문제 목록 조회 성공";

    // Tier
    public static final String NOT_FOUND_TIER = "존재하지 않는 티어";

    // Image
    public static final String INVALID_IMAGE = "잘못된 이미지";
    public static final String GET_BOJID_FROM_IMG_SUCCESS = "이미지에서 백준 아이디 추출하기 성공";
    public static final String GET_PROBLEM_FROM_IMG_SUCCESS = "이미지에서 문제 추출하기 성공";
    // Analysis
    public static final String GET_ANALYSIS_INFO_SUCCESS = "분석 정보 조회 성공";
    public static final String GET_ANALYSIS_LANGUAGE_SUCCESS = "사용 언어 비율 조회 성공";
    public static final String GET_ANALYSIS_SOLVED_COUNT_SUCCESS = "월별 문제 풀이 개수 조회 성공";
    public static final String GET_SOLVING_LOG_STATISTICS_SUCCESS = "풀이기록 통계 조회 성공";

}
