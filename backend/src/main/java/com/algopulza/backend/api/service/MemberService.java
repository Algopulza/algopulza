package com.algopulza.backend.api.service;

import com.algopulza.backend.api.request.member.*;
import com.algopulza.backend.api.response.*;
import com.algopulza.backend.config.jwt.RoleType;

public interface MemberService {

    MemberRes getMember(Long memberId);

    void modifyProfileImage(ModifyProfileImageReq modifyProfileImageReq);

    Long addMember(JoinReq joinReq);

    String createToken(Long id, RoleType roleType);

    String createRefreshToken(Long id);

    TokenRes refreshAccessToken(Long id, String refreshToken);

    void logout(Long id);

    LoginMemberRes login(LoginReq loginReq);

    boolean checkId(String id);
}

