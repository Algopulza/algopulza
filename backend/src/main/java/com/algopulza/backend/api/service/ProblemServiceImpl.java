package com.algopulza.backend.api.service;

import com.algopulza.backend.api.response.*;
import com.algopulza.backend.common.model.ResponseMessage;
import com.algopulza.backend.db.entity.*;
import com.algopulza.backend.db.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
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

    // 구현, DP, 그래프, 그리디, 정렬, BFS, DFS, 조합론 태그의 맵 {boj_key : boj_tag_id}
    private Map<String, Integer> tagMap = new HashMap<>() {{
        put("simulation", 141);
        put("dp", 25);
        put("graphs", 7);
        put("greedy", 33);
        put("sorting", 97);
        put("bfs", 126);
        put("dfs", 127);
        put("combinatorics", 6);
    }};
    // 티어별 레벨 시작값 맵 {tier name : level start value}
    private Map<String, Integer> levelMap = new HashMap<>() {{
        put("bronze", 1);
        put("silver", 6);
        put("gold", 11);
        put("platinum", 16);
    }};

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

    @Override
    public List<ProblemAndStatusRes> getProblemList(Long memberId, Pageable pageable) {
        // Problem List 조회
        List<ProblemAndStatusRes> problemAndStatusResList = problemRepository.findProblemAndStatusResByMemberId(memberId, pageable);

        // Problem별로 Tag List 조회
        for (ProblemAndStatusRes problemAndStatusRes : problemAndStatusResList) {
            problemAndStatusRes.setTagList(tagRepository.findByProblemId(problemAndStatusRes.getProblemId()));
        }

        return problemAndStatusResList;
    }

    @Override
    public List<ProblemRes> getProblemListByKeyword(String keyword, Pageable pageable) {
        // 제목으로 Problem 검색
        List<ProblemRes> problemResList = problemRepository.findProblemResByTitleLike(keyword, pageable);
        // 각 Problem별 Tag List 조회
        for (ProblemRes problemRes : problemResList) {
            problemRes.setTagList(tagRepository.findByProblemId(problemRes.getProblemId()));
        }
        return problemResList;
    }

    @Override
    public ProblemRes getOneRandomProblem() {
        List<Long> problemIdList = problemRepository.findAllId();
        int index = (int) (Math.random() * problemIdList.size());
        return problemRepository.findProblemResById(problemIdList.get(index));
    }

    /**
     * 랜덤 페이지의 모든 종류의 랜덤 문제 리스트를 반환
     */
    @Override
    public RandomListRes getRandomProblemList() {
        return RandomListRes.builder()
                            .simulationList(getRandomProblemListByCondition(0, tagMap.get("simulation"), 5))
                            .dpList(getRandomProblemListByCondition(0, tagMap.get("dp"), 5))
                            .graphList(getRandomProblemListByCondition(0, tagMap.get("graphs"), 5))
                            .greedyList(getRandomProblemListByCondition(0, tagMap.get("greedy"), 5))
                            .sortingList(getRandomProblemListByCondition(0, tagMap.get("sorting"), 5))
                            .bfsList(getRandomProblemListByCondition(0, tagMap.get("bfs"), 5))
                            .dfsList(getRandomProblemListByCondition(0, tagMap.get("dfs"), 5))
                            .combinationList(getRandomProblemListByCondition(0, tagMap.get("combinatorics"), 5))
                            .bronzeList(getRandomProblemListByCondition(1, levelMap.get("bronze"), 5))
                            .silverList(getRandomProblemListByCondition(1, levelMap.get("silver"), 5))
                            .goldList(getRandomProblemListByCondition(1, levelMap.get("gold"), 5))
                            .platinumList(getRandomProblemListByCondition(1, levelMap.get("platinum"), 5))
                            .build();
    }

    /**
     * 한 종류의 랜덤 문제 리스트를 반환
     * type: 종류 (0: 태그별, 1: 레벨별)
     * condition: 조회 조건 (type이 0이면 태그의 boj_tag_id, 1이면 tier table의 level column 시작값)
     * count: 조회할 개수
     */
    @Override
    public List<ProblemRes> getRandomProblemListByCondition(int type, int condition, int count) {
        List<Long> problemIdList = new ArrayList<>();
        Set<Long> problemIdSet = new HashSet<>();

        if (type == 0) {
            // Tag Id가 condition에 해당하는 문제 Id 조회
            Set<Long> problemIdSetByTag = new HashSet<>(problemRepository.findProblemIdByBojTagId(condition));
            // Bronze 5 ~ Platinum 1 범위에 해당하는 문제 Id 조회
            Set<Long> problemIdSetByLevel = Set.copyOf(problemRepository.findProblemIdByLevelRange(
                    levelMap.get("bronze"), levelMap.get("platinum") + 4
            ));
            // 두 조건을 모두 만족하는 문제 Id 조회
            problemIdSetByTag.retainAll(problemIdSetByLevel);
            problemIdList = List.copyOf(problemIdSetByTag);
        } else if (type == 1) {
            problemIdList = problemRepository.findProblemIdByLevelRange(condition, condition + 4);
        }

        while (problemIdSet.size() < count) {
            int index = (int) (Math.random() * problemIdList.size());
            problemIdSet.add(problemIdList.get(index));
        }

        // Problem 목록 조회
        List<ProblemRes> problemResList = problemRepository.findProblemResByIdSet(problemIdSet);
        // Problem별 Tag 목록 조회
        for (ProblemRes problemRes : problemResList) {
            problemRes.setTagList(tagRepository.findByProblemId(problemRes.getProblemId()));
        }

        return problemResList;
    }

}
