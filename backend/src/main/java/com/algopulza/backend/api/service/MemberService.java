package com.algopulza.backend.api.service;

import com.algopulza.backend.api.request.member.ModifyMemberReq;
import com.algopulza.backend.api.request.member.ModifyProfileImageReq;
import com.algopulza.backend.api.response.MemberRes;
import com.algopulza.backend.api.response.TokenRes;
import com.algopulza.backend.db.entity.Member;

import java.util.List;

public interface MemberService {

    MemberRes getMember(Long memberId);

    void modifyProfileImage(ModifyProfileImageReq modifyProfileImageReq);

    Member addMember(String solvedacToken);

    void modifyMember(ModifyMemberReq modifyMemberReq);

    String createToken(Long id, List<String> roles);

    String createRefreshToken(Long id);

    TokenRes refreshAccessToken(Long id, String refreshToken);

    void logout(Long id);
}

