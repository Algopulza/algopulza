package com.algopulza.backend.api.service;

import com.algopulza.backend.api.request.AddSolvingLogReq;
import com.algopulza.backend.api.response.SolvingLogRes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SolvingLogService {

    void addSolvingLogFromString(Long memberId, String status, String problemBojIdString);

    void addSolvingLog(Long memberId, AddSolvingLogReq addSolvingLogReq);

    Page<SolvingLogRes> getSolvingLogList(Long memberId, Pageable pageable);

}
