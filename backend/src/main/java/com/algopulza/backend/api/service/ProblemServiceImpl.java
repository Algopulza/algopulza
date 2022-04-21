package com.algopulza.backend.api.service;

import com.algopulza.backend.api.response.SolvedAcProblemRes;
import com.algopulza.backend.db.repository.ProblemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.Charset;
import java.util.LinkedList;
import java.util.List;

@RequiredArgsConstructor
@Transactional
@Service
public class ProblemServiceImpl implements ProblemService {

    private final ProblemRepository problemRepository;

    @Value("${solvedac.problems.get.defaultStart}")
    private int ProblemsStartNumber;

    @Value("${solvedac.problems.get.defaultEnd}")
    private int ProblemsEndNumber;

    @Value("${solvedac.problems.get.size}")
    private int ProblemsSolvedacGetSize;

    @Value("${solvedac.baseurl}")
    private String SolvedacBaseUrl;

    @Override
    public List<SolvedAcProblemRes> getProblemListFromSolvedac(int start, int end) {
        // TODO: HttpComponentsClientHttpRequestFactory를 통한 timeout 설정
        RestTemplate restTemplate = new RestTemplate();
        StringBuilder result = new StringBuilder();
        // 정보를 요청할 문제들의 ID값
        StringBuilder problemIdList = new StringBuilder();
        // 정보를 요청할 API URL
        StringBuilder requestUrl = new StringBuilder();
        List<SolvedAcProblemRes> solvedAcProblemResList = new LinkedList<>();

        // 유효하지 않은 범위로 요청 시에는 기본 범위로 조회
        if (end > 0 && start <= end) {
            ProblemsStartNumber = start;
            ProblemsEndNumber = end;
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        start = ProblemsStartNumber;
        while (start <= ProblemsEndNumber) { // 요청 범위의 마지막 번호까지 수집
            for (int i = 0; i < ProblemsSolvedacGetSize; i++) { // 100개씩 수집
                problemIdList.append(start + i).append(",");
                if (start + i == ProblemsEndNumber) {
                    break;
                }
            }

            // 맨 뒤에 붙은 쉼표(,) 제거
            problemIdList.setLength(problemIdList.length() - 1);

            requestUrl.append(SolvedacBaseUrl).append("problem/lookup?problemIds=").append(problemIdList.toString());
            solvedAcProblemResList.addAll(restTemplate.getForObject(requestUrl.toString(), List.class));

            problemIdList.setLength(0);
            requestUrl.setLength(0);

            start += ProblemsSolvedacGetSize;
        }

        return solvedAcProblemResList;
    }

}
