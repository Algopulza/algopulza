package com.algopulza.backend.api.service;

import com.algopulza.backend.common.model.SaProblemsResponse;
import com.algopulza.backend.db.repository.ProblemRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.Charset;
import java.util.List;

@RequiredArgsConstructor
@Transactional
@Service
public class ProblemServiceImpl implements ProblemService{

    private final ProblemRepository problemRepository;

    @Value("${solvedac.problems.get.defaultStart}")
    private Integer ProblemsStartNumber;

    @Value("${solvedac.problems.get.defaultEnd}")
    private Integer ProblemsEndNumber;

    @Value("${solvedac.problems.get.size}")
    private Integer ProblemsSolvedacGetSize;

    @Value("${solvedac.problems.get.url}")
    private String SovledacGetProblemsUrl;

    @Override
    public String addProblems(Integer start, Integer end) throws JsonProcessingException {

        if (start == 0) start = ProblemsStartNumber;
        if (end == 0) end = ProblemsEndNumber;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json",
                                    Charset.forName("UTF-8")));

        RestTemplate restTemplate = new RestTemplate();
        StringBuilder result = new StringBuilder();

        for (int i = start; i <= end; i += ProblemsSolvedacGetSize) {
            StringBuilder sb = new StringBuilder();

            for (int j = 0; j < ProblemsSolvedacGetSize; j++) {
                sb.append(i + j).append(",");
            }

            String problemIds = sb.toString().substring(0, sb.length() - 1);

            // 여러개 받는
            String resp = restTemplate.getForObject(SovledacGetProblemsUrl + problemIds,
                    String.class);

            // 여러개 받는
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            List<SaProblemsResponse> problemList = objectMapper.readValue(resp, new TypeReference<List<SaProblemsResponse>>() {});

            problemList.forEach(s -> System.out.println(s.getProblemId()));

            result.append(resp);

        }

        return result.toString();
    }

}
