package com.algopulza.backend.db.repository;

import com.algopulza.backend.db.entity.Member;

import java.time.LocalDateTime;
import java.util.List;

public interface LoginLogRepositoryCustom {

    List<LocalDateTime> findLoginLog(Member member);
}
