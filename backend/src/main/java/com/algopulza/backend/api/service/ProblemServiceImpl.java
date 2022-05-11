package com.algopulza.backend.api.service;

import com.algopulza.backend.api.response.*;
import com.algopulza.backend.common.exception.NotFoundException;
import com.algopulza.backend.common.exception.handler.ErrorCode;
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
import reactor.core.publisher.Flux;
import reactor.core.scheduler.Schedulers;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.*;
import java.util.concurrent.CountDownLatch;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Transactional
@Service
public class ProblemServiceImpl implements ProblemService {

    private final WebClient webClient;
    private final ProblemRepository problemRepository;
    private final TierRepository tierRepository;
    private final ProblemHasTagRepository problemHasTagRepository;
    private final TagRepository tagRepository;
    private final ProblemMarkRepository problemMarkRepository;
    private final MemberRepository memberRepository;

    // 구현, DP, 그래프, 그리디, 정렬, BFS, DFS, 조합론 태그의 맵 {boj_key : boj_tag_id}
    private final Map<String, Integer> tagMap = new HashMap<>() {{
        put("simulation", 141);
        put("dp", 25);
        put("graphs", 7);
        put("greedy", 33);
        put("sorting", 97);
        put("bfs", 126);
        put("dfs", 127);
        put("combinatorics", 6);
    }};

    @Value("${solvedac.problems.get.defaultStart}")
    private int ProblemsStartNumber;

    @Value("${solvedac.problems.get.defaultEnd}")
    private int ProblemsEndNumber;

    @Value("${solvedac.problems.get.size}")
    private int ProblemsSolvedacGetSize;

    /**
     * solved.ac API로 문제 리스트를 조회해서 DB에 저장
     */
    @Override
    public void getAndAddProblemList(Integer start, Integer end) throws InterruptedException {
        // 정보를 요청할 문제들의 ID값을 만드는 StringBuilder
        StringBuilder problemIdBuilder = new StringBuilder();
        // 정보를 요청할 문제들의 ID값 String List
        List<String> problemIdList = new ArrayList<>();

        // 요청값이 없거나, 유효하지 않은 범위로 요청 시에는 기본 범위로 조회
        if (start != null && end != null && end > 0 && start <= end) {
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

        // 문제 정보 리스트
        List<Problem> problemList = Collections.synchronizedList(new LinkedList<>());
        // 문제의 태그 정보 리스트
        List<ProblemHasTag> problemHasTagList = Collections.synchronizedList(new LinkedList<>());
        // <BojTagId, Tag> 구조의 태그 리스트 (중복 태그 삽입 방지를 위해 HashMap 사용)
        Map<Integer, Tag> tagMapByBojTagId = Collections.synchronizedMap(new HashMap<>());

        // 1. Solved.ac API로부터 문제 정보 수집
        log.info("{} ~ {} 문제 수집 시작", ProblemsStartNumber, ProblemsEndNumber);
        final List<Flux<SolvedAcProblemRes>> responses
                = problemIdList.stream()
                               .map(problemIds -> webClient.mutate().build()
                                                           .get()
                                                           .uri(uriBuilder -> uriBuilder.path("/problem/lookup")
                                                                                        .queryParam("problemIds", problemIds)
                                                                                        .build())
                                                           .retrieve()
                                                           .bodyToFlux(SolvedAcProblemRes.class))
                               .collect(Collectors.toList());

        // 실제로 정보를 받아온 문제 개수 측정
        int realProblemCount = 0;
        for (Flux<SolvedAcProblemRes> response : responses) {
            realProblemCount += response.collectList().block().size();
        }
        log.info("실제 수집 문제 개수: {}", realProblemCount);

        // 비동기 처리가 완료되면 DB에 데이터를 저장하기 위한 CountDownLatch
        CountDownLatch countDownLatch = new CountDownLatch(realProblemCount);

        for (Flux<SolvedAcProblemRes> response : responses) {
            response.parallel()
                    .runOn(Schedulers.parallel())
                    .subscribe(solvedAcProblemRes -> {
                        // 2. 수집한 정보로 Entity 생성
                        addEntitiesFromSolvedAcProblemRes(solvedAcProblemRes, problemList, problemHasTagList, tagMapByBojTagId);

                        countDownLatch.countDown();
                    });
        }

        countDownLatch.await();

        // 3. 수집한 정보 DB에 저장 or 업데이트
        problemRepository.saveAll(problemList);
        tagRepository.saveAll(tagMapByBojTagId.values());
        problemHasTagRepository.saveAll(problemHasTagList);

        log.info("{}개 문제, {}개 태그, {}개 문제-태그: {}",
                problemList.size(),
                tagMapByBojTagId.values().size(),
                problemHasTagList.size(),
                ResponseMessage.PUT_PROBLEM_LIST_SUCCESS
        );
    }

    /**
     * solved.ac API로 수집한 문제 정보를 DB에 맞게 Entity로 변환해서 List에 저장
     */
    @Override
    public void addEntitiesFromSolvedAcProblemRes(SolvedAcProblemRes solvedAcProblemRes, List<Problem> problemList, List<ProblemHasTag> problemHasTagList, Map<Integer, Tag> tagMapByBojTagId) {
        // DB에 없는 BojId를 가진 Problem이라면 새로운 Problem 생성
        Problem problem = problemRepository.findByBojId(solvedAcProblemRes.getProblemId()).orElseGet(Problem::new);
        // 이번 Problem이 가진 Tag List
        List<ProblemHasTag> nowProblemHasTagList = new LinkedList<>();

        // Problem Entity 설정
        problem.setTier(tierRepository.findById(solvedAcProblemRes.getLevel()).orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND_TIER)));
        problem.setBojId(solvedAcProblemRes.getProblemId());
        problem.setTitle(solvedAcProblemRes.getTitleKo());
        problem.setSolvableFlag(solvedAcProblemRes.getIsSolvable());
        problem.setAcceptedCount(solvedAcProblemRes.getAcceptedUserCount());
        problem.setAverageTryCount(solvedAcProblemRes.getAverageTries());
        problem.setUpdatedTime(ZonedDateTime.now(ZoneId.of("Asia/Seoul")).toLocalDateTime());

        problemList.add(problem);

        // Tag, ProblemHasTag Entity 설정
        for (SolvedAcTagRes solvedAcTagRes : solvedAcProblemRes.getTags()) { // Tag별로 반복
            // 태그 이름 중 첫 번째 값을 가져온다.
            SolvedAcTagDisplayNameRes tagDisplayName = solvedAcTagRes.getDisplayNames().get(0);

            // 해당 Tag 정보가 DB에 없고, DB Insert List에 없다면 Insert List에 추가
            Tag tag = tagRepository.findByBojTagId(solvedAcTagRes.getBojTagId()).orElseGet(Tag::new);
            if (tag.getId() == null && !tagMapByBojTagId.containsKey(solvedAcTagRes.getBojTagId())) {
                tag.setBojTagId(solvedAcTagRes.getBojTagId());
                tag.setBojKey(solvedAcTagRes.getKey());
                tag.setName(tagDisplayName.getName());
                tag.setShortName(tagDisplayName.getName());
                tag.setUpdatedTime(ZonedDateTime.now(ZoneId.of("Asia/Seoul")).toLocalDateTime());

                tagMapByBojTagId.put(solvedAcTagRes.getBojTagId(), tag);
            }

            // Problem 또는 Tag가 새로 추가되었거나, ProblemHasTag 정보가 DB에 없다면 Insert
            ProblemHasTag problemHasTag;
            if (problem.getId() == null || tag.getId() == null || problemHasTagRepository.findByProblemIdAndTagId(problem.getId(), tag.getId()) == null) {
                problemHasTag = new ProblemHasTag();

                problemHasTag.setProblem(problem);
                // tag.getId() == null 조건으로 if문 진입했다면 태그 정보는 tagMapByBojTagId 에서 가져온다.
                problemHasTag.setTag(tagMapByBojTagId.getOrDefault(solvedAcTagRes.getBojTagId(), tag));
                problemHasTag.setUpdatedTime(ZonedDateTime.now(ZoneId.of("Asia/Seoul")).toLocalDateTime());

                nowProblemHasTagList.add(problemHasTag);
            }
        }

        problemHasTagList.addAll(nowProblemHasTagList);
    }

    /**
     * 문제 리스트 반환
     * 필터링 조건이 있다면 필터링해서 반환, 없다면 전체 문제 반환
     */
    @Override
    public List<ProblemRes> getProblemList(String tierName, Integer tierLevel, Pageable pageable) {
        // Problem List 조회
        List<ProblemRes> problemResList = problemRepository.findProblemRes(tierName, tierLevel, pageable);
        // Problem별로 Tag List 조회
        for (ProblemRes problemAndStatusRes : problemResList) {
            problemAndStatusRes.setTagList(tagRepository.findByProblemId(problemAndStatusRes.getProblemId()));
        }
        return problemResList;
    }

    /**
     * 제목으로 문제 검색
     */
    @Override
    public List<ProblemRes> getProblemListByTitle(String title, Pageable pageable) {
        // 제목으로 Problem 검색
        List<ProblemRes> problemResList = problemRepository.findProblemResByTitleLike(title, pageable);
        // 각 Problem별 Tag List 조회
        for (ProblemRes problemRes : problemResList) {
            problemRes.setTagList(tagRepository.findByProblemId(problemRes.getProblemId()));
        }
        return problemResList;
    }

    /**
     * 모든 문제 중 랜덤으로 하나의 문제를 반환
     */
    @Override
    public ProblemRes getOneRandomProblem() {
        List<Long> problemIdList = problemRepository.findAllId();
        int index = (int) (Math.random() * problemIdList.size());

        ProblemRes problemRes = problemRepository.findProblemResById(problemIdList.get(index));
        problemRes.setTagList(tagRepository.findByProblemId(problemRes.getProblemId()));

        return problemRes;
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
                            .bronzeList(getRandomProblemListByCondition(1, "Bronze", 5))
                            .silverList(getRandomProblemListByCondition(1, "Silver", 5))
                            .goldList(getRandomProblemListByCondition(1, "Gold", 5))
                            .platinumList(getRandomProblemListByCondition(1, "Platinum", 5))
                            .build();
    }

    /**
     * 풀었던 문제들 중 랜덤으로 5개를 반환
     */
    @Override
    public List<ProblemRes> getRandomSolvedProblemList(Long memberId) {
        // memberId가 푼 문제의 Id 리스트
        List<Long> problemIdList = problemRepository.findProblemIdByStatus(memberId, "solved");
        Set<Long> problemIdSet = new HashSet<>();

        // 반환할 문제 정보 개수 (푼 문제의 수가 5개보다 적다면 푼 문제 모두 반환)
        int selectCount = Math.min(problemIdList.size(), 5);

        while (problemIdSet.size() < selectCount) {
            problemIdSet.add(problemIdList.get((int) (Math.random() * problemIdList.size())));
        }

        // 랜덤으로 선택된 5개의 문제 아이디로 문제 정보 조회
        List<ProblemRes> problemResList = problemRepository.findProblemResByIdSet(problemIdSet);
        // 각 Problem별 Tag List 조회
        for (ProblemRes problemRes : problemResList) {
            problemRes.setTagList(tagRepository.findByProblemId(problemRes.getProblemId()));
        }

        return problemResList;
    }

    /**
     * 한 종류의 랜덤 문제 리스트를 반환
     * type: 종류 (0: 태그별, 1: 레벨별)
     * condition: 조회 조건 (type이 0이면 태그의 boj_tag_id, 1이면 tier table의 level column 시작값)
     * count: 조회할 개수
     */
    @Override
    public List<ProblemRes> getRandomProblemListByCondition(int type, Object condition, int count) {
        List<Long> problemIdList = new ArrayList<>();
        Set<Long> problemIdSet = new HashSet<>();
        Set<String> tierNameSet = new HashSet<>();

        if (type == 0) {
            // Tag Id가 condition에 해당하는 문제 Id 조회
            Set<Long> problemIdSetByTag = new HashSet<>(problemRepository.findProblemIdByBojTagId((Integer) condition));
            // Bronze 5 ~ Platinum 1 범위에 해당하는 문제 Id 조회
            tierNameSet.add("Bronze");
            tierNameSet.add("Silver");
            tierNameSet.add("Gold");
            tierNameSet.add("Platinum");
            Set<Long> problemIdSetByLevel = Set.copyOf(problemRepository.findProblemIdByTierNameSet(tierNameSet));
            // 두 조건을 모두 만족하는 문제 Id 조회
            problemIdSetByTag.retainAll(problemIdSetByLevel);
            problemIdList = List.copyOf(problemIdSetByTag);
        } else if (type == 1) {
            tierNameSet.add((String) condition);
            problemIdList = problemRepository.findProblemIdByTierNameSet(tierNameSet);
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

    @Override
    public void addProblemMark(Long memberId, Long problemId, int typeFlag) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND_MEMBER));
        Problem problem = problemRepository.findById(problemId).orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND_PROBLEM));
        problemMarkRepository.save(new ProblemMark(member, problem, typeFlag));
    }

    @Override
    public void deleteProblemMark(Long memberId, Long problemId, int typeFlag) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND_MEMBER));
        Problem problem = problemRepository.findById(problemId).orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND_PROBLEM));
        ProblemMark problemMark = problemMarkRepository.findByMemberAndProblemAndTypeFlag(member, problem, typeFlag)
                                                       .orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND_PROBLEM_MARK));

        problemMarkRepository.delete(problemMark);
    }

    @Override
    public List<ProblemMarkRes> getProblemMarkList(Long memberId, int typeFlag) {
        return problemMarkRepository.findProblemByTypeFlag(memberId, typeFlag);
    }

}
