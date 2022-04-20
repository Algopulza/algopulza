package com.algopulza.backend.common.model;

import io.swagger.annotations.ApiModel;
import lombok.Data;

import java.util.List;

@ApiModel("SaTagResponse")
@Data
public class SaTagResponse {

    private String key;

    private String isMeta;

    private Integer bojTagId;

    private Integer problemCount;

    private List<SaTagDisplayNameResponse> displayNames;

}
