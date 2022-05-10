package com.algopulza.backend.api.service;

import com.algopulza.backend.api.request.member.*;
import com.algopulza.backend.api.response.MemberRes;
import com.algopulza.backend.api.response.TokenRes;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import com.algopulza.backend.config.jwt.RoleType;

public interface MemberService {

    MemberRes getMember(Long memberId);

    void modifyProfileImage(ModifyProfileImageReq modifyProfileImageReq);

    MemberRes addMember(String bojId);

    void modifyMember(ModifyMemberReq modifyMemberReq);

    String createToken(Long id, RoleType roleType);

    String createRefreshToken(Long id);

    TokenRes refreshAccessToken(Long id, String refreshToken);

    void logout(Long id);

    void addSolvedProblem(AddSolvedProblemReq addSolvedProblemReq);

    void addTriedProblem(AddTriedProblemReq addTriedProblemReq);

    void addDetailSolvedProblem(AddDetailSolvedProblem addDetailSolvedProblem);

    String extractBojIdFromImg(MultipartFile capturedImage);
}

