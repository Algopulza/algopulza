package com.algopulza.backend.api.response;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SolvingLogStatisticsRes {

    private long totalSolvedCount;

    private long totalSolvedCodeLength;

    private long totalSolvingTime;

}
