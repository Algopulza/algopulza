package com.algopulza.backend.api.service;

import com.algopulza.backend.api.request.member.*;
import com.algopulza.backend.api.response.LoginMemberRes;
import com.algopulza.backend.api.response.MemberRes;
import com.algopulza.backend.api.response.TokenRes;
import com.algopulza.backend.config.jwt.RoleType;
import org.springframework.web.multipart.MultipartFile;

public interface MemberService {

    MemberRes getMember(Long memberId);

    void modifyProfileImage(ModifyProfileImageReq modifyProfileImageReq);

    void addMember(JoinReq joinReq);

    void collectSolvingLog(Long memberId);

    void modifyMember(ModifyMemberReq modifyMemberReq);

    String createToken(Long id, RoleType roleType);

    String createRefreshToken(Long id);

    TokenRes refreshAccessToken(Long id, String refreshToken);

    void logout(Long id);

    void addSolvedProblem(AddProblemReq addSolvedProblemReq);

    void addTriedProblem(AddProblemReq addTriedProblemReq);

    String extractBojIdFromImg(MultipartFile capturedImage);

    LoginMemberRes login(LoginReq loginReq);

    boolean checkId(String id);
}

