package com.algopulza.backend.api.response;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SolvedCountByYearRes {

    private int year;

    private int[] solvedCount;

}
