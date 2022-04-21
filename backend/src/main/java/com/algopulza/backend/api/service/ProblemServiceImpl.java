package com.algopulza.backend.api.service;

import com.algopulza.backend.api.response.SolvedAcProblemRes;
import com.algopulza.backend.db.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@RequiredArgsConstructor
@Transactional
@Service
public class ProblemServiceImpl implements ProblemService {

    private final ProblemRepository problemRepository;
    private final TierRepository tierRepository;
    private final ProblemHasTagRepository problemHasTagRepository;
    private final TagRepository tagRepository;

    @Value("${solvedac.problems.get.defaultStart}")
    private int ProblemsStartNumber;

    @Value("${solvedac.problems.get.defaultEnd}")
    private int ProblemsEndNumber;

    @Value("${solvedac.problems.get.size}")
    private int ProblemsSolvedacGetSize;

    @Value("${solvedac.baseurl}")
    private String SolvedacBaseUrl;

    @Override
    public void getAndAddProblemList(int start, int end) {
        // 1. Solved.ac API로부터 문제 정보 수집
        // 정보를 요청할 문제들의 ID값을 만드는 StringBuilder
        StringBuilder problemIdBuilder = new StringBuilder();
        // 정보를 요청할 문제들의 ID값 String List
        List<String> problemIdList = new ArrayList<>();
        // 수집한 문제 정보
        List<SolvedAcProblemRes> solvedAcProblemResList = new LinkedList<>();

        // 유효하지 않은 범위로 요청 시에는 기본 범위로 조회
        if (end > 0 && start <= end) {
            ProblemsStartNumber = start;
            ProblemsEndNumber = end;
        }

        start = ProblemsStartNumber;
        while (start <= ProblemsEndNumber) { // 요청 범위의 마지막 번호까지 수집
            for (int i = 0; i < ProblemsSolvedacGetSize; i++) { // 100개씩 수집
                problemIdBuilder.append(start + i).append(",");
                if (start + i == ProblemsEndNumber) {
                    break;
                }
            }

            // 맨 뒤에 붙은 쉼표(,) 제거
            problemIdBuilder.setLength(problemIdBuilder.length() - 1);
            problemIdList.add(problemIdBuilder.toString());
            problemIdBuilder.setLength(0);

            start += ProblemsSolvedacGetSize;
        }

        final List<Mono<List<SolvedAcProblemRes>>> responses = IntStream.range(0, problemIdList.size())
                                                                        .mapToObj(index -> WebClient.create(SolvedacBaseUrl + "problem/lookup?problemIds=" + problemIdList.get(index))
                                                                                                    .get().retrieve()
                                                                                                    .bodyToFlux(SolvedAcProblemRes.class)
                                                                                                    .collectList())
                                                                        .collect(Collectors.toList()); // create iterable of mono of network calls

        Mono.zip(responses, Arrays::asList) // make parallel network calls and collect it to a list
            .flatMapIterable(objects -> objects) // make flux of objects
            .doOnComplete(() -> {

            }) // doOnComplete: 모든 요청들이 끝나면 실행
            .subscribe(response -> {
                for (SolvedAcProblemRes solvedAcProblemRes : (List<SolvedAcProblemRes>) response) {
                    // 2. 수집한 정보로 Entity 생성
                    // 3. DB에 저장
                }
            }) // subscribe: 각 요청이 끝나면 실행 (100개씩 DB에 저장)
        ;
    }
}