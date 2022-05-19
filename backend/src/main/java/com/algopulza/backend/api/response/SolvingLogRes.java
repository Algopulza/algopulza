package com.algopulza.backend.api.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SolvingLogRes {

    private Long problemId;

    private int problemBojId;

    private String problemTitle;

    private String status;

    private String language;

    private int memory;

    private int runTime;

    private int solvingTime;

    private LocalDateTime submitTime;

}
