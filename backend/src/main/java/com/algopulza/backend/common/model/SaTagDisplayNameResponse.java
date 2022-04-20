package com.algopulza.backend.common.model;

import io.swagger.annotations.ApiModel;
import lombok.Data;

@ApiModel("SaTagDisplayNameResponse")
@Data
public class SaTagDisplayNameResponse {

    private String language;

    private String name;
}
