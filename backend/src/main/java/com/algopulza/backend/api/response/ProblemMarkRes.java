package com.algopulza.backend.api.response;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProblemMarkRes {

    private Long problemId;

    private int problemBojId;

    private String title;

    private int tierLevel;

    private String tierName;

}
