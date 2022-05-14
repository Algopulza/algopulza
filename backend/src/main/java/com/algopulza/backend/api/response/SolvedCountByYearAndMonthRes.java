package com.algopulza.backend.api.response;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SolvedCountByYearAndMonthRes {

    private int year;

    private int month;

    private long solvedCount;

}
