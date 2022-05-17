package com.algopulza.backend.db.repository;

import com.algopulza.backend.api.response.TagRes;

import java.util.List;

public interface TagRepositoryCustom {

    List<TagRes> findByProblemId(Long problemId);

}
