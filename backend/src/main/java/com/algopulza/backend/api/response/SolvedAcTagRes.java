package com.algopulza.backend.api.response;

import io.swagger.annotations.ApiModel;
import lombok.Data;

import java.util.List;

@ApiModel("SolvedAcTagRes")
@Data
public class SolvedAcTagRes {

    private String key;

    private Boolean isMeta;

    private Integer bojTagId;

    private Integer problemCount;

    private List<SolvedAcTagDisplayNameRes> displayNames;

}
