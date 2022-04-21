package com.algopulza.backend.api.response;

import io.swagger.annotations.ApiModel;
import lombok.Data;

@ApiModel("SolvedAcProblemTitleRes")
@Data
public class SolvedAcProblemTitleRes {

    private String language;

    private String languageDisplayName;

    private String title;

    private Boolean isOriginal;
}
