package com.algopulza.backend.api.service;

import com.algopulza.backend.db.entity.Member;

public interface MemberService {
    Member GetMember(int memberId);
}
