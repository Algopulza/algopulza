package com.algopulza.backend.api.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class LanguageAnalysisRes {

    private String language;

    private long count;

    private double percentage;

    public LanguageAnalysisRes(String language, long count, long totalCount) {
        this.language = language;
        this.count = count;
        this.percentage = count / ((double) totalCount) * 100;
    }

}
