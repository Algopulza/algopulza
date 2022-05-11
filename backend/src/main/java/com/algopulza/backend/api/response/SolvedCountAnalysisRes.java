package com.algopulza.backend.api.response;

import lombok.*;


@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SolvedCountAnalysisRes {

    private int year;

    private int month;

    private long solvedCount;

}
