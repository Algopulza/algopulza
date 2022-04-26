package com.algopulza.backend.api.service;

import com.algopulza.backend.api.response.*;
import com.algopulza.backend.common.model.ResponseMessage;
import com.algopulza.backend.db.entity.*;
import com.algopulza.backend.db.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Slf4j
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
                                                                                                    .get().retrieve().bodyToFlux(SolvedAcProblemRes.class)
                                                                                                    .collectList()).collect(Collectors.toList()); // create iterable of mono of network calls

        Mono.zip(responses, Arrays::asList) // make parallel network calls and collect it to a list
            .flatMapIterable(objects -> objects) // make flux of objects
            .doOnComplete(() -> {
                log.info("{} ~ {} {}", ProblemsStartNumber, ProblemsEndNumber, ResponseMessage.PUT_PROBLEM_LIST_SUCCESS);
            }) // doOnComplete: 모든 요청들이 끝나면 실행
            .subscribe(response -> {
                List<Problem> problemList = new LinkedList<>();
                List<ProblemHasTag> problemHasTagList = new LinkedList<>();
                // 중복 태그 삽입 방지를 위해 HashMap 사용
                HashMap<Integer, Tag> tagMapBybojTagId = new HashMap<>();

                for (SolvedAcProblemRes solvedAcProblemRes : (List<SolvedAcProblemRes>) response) {
                    // 2. 수집한 정보로 Entity 생성
                    ProblemAndTag problemAndTag = getEntitiesFromSolvedAcProblemRes(solvedAcProblemRes, tagMapBybojTagId);

                    problemList.add(problemAndTag.getProblem());
                    problemHasTagList.addAll(problemAndTag.getProblemHasTagList());
                }
                // 3. DB에 저장
                problemRepository.saveAll(problemList);
                tagRepository.saveAll(tagMapBybojTagId.values());
                problemHasTagRepository.saveAll(problemHasTagList);

                log.info("{}개 문제 {}", problemList.size(), ResponseMessage.PUT_PROBLEM_LIST_SUCCESS);
            }) // subscribe: 각 요청이 끝나면 실행 (100개씩 DB에 저장)
        ;
    }

    @Override
    public ProblemAndTag getEntitiesFromSolvedAcProblemRes(SolvedAcProblemRes solvedAcProblemRes, HashMap<Integer, Tag> tagMapBybojTagId) {
        Problem problem = problemRepository.findByBojId(solvedAcProblemRes.getProblemId()).orElseGet(Problem::new);
        List<ProblemHasTag> problemHasTagList = new LinkedList<>();

        // Problem Entity 설정
        problem.setTier(tierRepository.findByLevel(solvedAcProblemRes.getLevel()));
        problem.setBojId(solvedAcProblemRes.getProblemId());
        problem.setTitle(solvedAcProblemRes.getTitleKo());
        problem.setSolvableFlag(solvedAcProblemRes.getIsSolvable());
        problem.setAcceptedCount(solvedAcProblemRes.getAcceptedUserCount());
        problem.setAverageTryCount(solvedAcProblemRes.getAverageTries());

        // Tag, ProblemHasTag Entity 설정
        for (SolvedAcTagRes solvedAcTagRes : solvedAcProblemRes.getTags()) { // Tag별로 반복
            // 태그 이름 중 첫 번째 값을 가져온다.
            SolvedAcTagDisplayNameRes tagDisplayName = solvedAcTagRes.getDisplayNames().get(0);

            // 해당 Tag 정보가 DB에 없고, DB Insert List에 없다면 Insert
            Tag tag = tagRepository.findByBojTagId(solvedAcTagRes.getBojTagId()).orElseGet(Tag::new);
            if (tag.getId() == null && !tagMapBybojTagId.containsKey(solvedAcTagRes.getBojTagId())) {
                tag.setBojTagId(solvedAcTagRes.getBojTagId());
                tag.setBojKey(solvedAcTagRes.getKey());
                tag.setName(tagDisplayName.getName());
                tag.setShortName(tagDisplayName.getName());

                tagMapBybojTagId.put(solvedAcTagRes.getBojTagId(), tag);
            }

            // ProblemHasTag 정보가 DB에 없다면 Insert
            ProblemHasTag problemHasTag;
            if (problem.getId() == null || tag.getId() == null || problemHasTagRepository.findByProblemIdAndTagId(problem.getId(), tag.getId()) == null) {
                problemHasTag = new ProblemHasTag();

                problemHasTag.setProblem(problem);
                problemHasTagList.add(problemHasTag);

                // tag.getId() == null 조건으로 if문 진입했다면 태그 정보는 tagMapBybojTagId 에 있다.
                if (tagMapBybojTagId.containsKey(solvedAcTagRes.getBojTagId())) {
                    problemHasTag.setTag(tagMapBybojTagId.get(solvedAcTagRes.getBojTagId()));
                } else {
                    problemHasTag.setTag(tag);
                }
            }
        }

        return new ProblemAndTag(problem, problemHasTagList);
    }

}
