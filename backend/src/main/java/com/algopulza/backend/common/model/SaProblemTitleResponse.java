package com.algopulza.backend.common.model;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiModel;
import lombok.Data;

@ApiModel("SaProblemTitleResponse")
@Data
public class SaProblemTitleResponse {

    private String language;

    private String languageDisplayName;

    private String title;

    private String isOriginal;
}
