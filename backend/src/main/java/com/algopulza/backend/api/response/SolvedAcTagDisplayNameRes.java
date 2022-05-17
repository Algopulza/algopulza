package com.algopulza.backend.api.response;

import io.swagger.annotations.ApiModel;
import lombok.Data;

@ApiModel("SolvedAcTagDisplayNameRes")
@Data
public class SolvedAcTagDisplayNameRes {

    private String language;

    private String name;

}
