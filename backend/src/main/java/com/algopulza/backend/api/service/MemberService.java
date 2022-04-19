package com.algopulza.backend.api.service;

import com.algopulza.backend.api.request.member.ModifyMemberReq;
import com.algopulza.backend.db.entity.Member;

public interface MemberService {
    Member GetMember(int memberId);

    void modifyMember(ModifyMemberReq modifyMemberReq);
}
