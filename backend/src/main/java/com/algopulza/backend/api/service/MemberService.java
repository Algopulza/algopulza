package com.algopulza.backend.api.service;

import com.algopulza.backend.api.request.member.ModifyMemberReq;
import com.algopulza.backend.db.entity.Member;
import com.fasterxml.jackson.core.JsonProcessingException;

public interface MemberService {
    Member getMember(int memberId);

    void modifyMember(ModifyMemberReq modifyMemberReq);

    void addMember(String solvedacToken) throws JsonProcessingException;
}
