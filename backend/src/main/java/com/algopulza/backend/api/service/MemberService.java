package com.algopulza.backend.api.service;

import com.algopulza.backend.api.request.member.*;
import com.algopulza.backend.api.response.MemberRes;
import com.algopulza.backend.api.response.TokenRes;

import java.util.List;

public interface MemberService {

    MemberRes getMember(Long memberId);

    void modifyProfileImage(ModifyProfileImageReq modifyProfileImageReq);

    MemberRes addMember(String bojId);

    void modifyMember(ModifyMemberReq modifyMemberReq);

    String createToken(Long id, List<String> roles);

    String createRefreshToken(Long id);

    TokenRes refreshAccessToken(Long id, String refreshToken);

    void logout(Long id);

    void addSolvedProblem(AddSolvedProblemReq addSolvedProblemReq);

    void addTriedProblem(AddTriedProblemReq addTriedProblemReq);

    void addDetailSolvedProblem(AddDetailSolvedProblem addDetailSolvedProblem);
}

