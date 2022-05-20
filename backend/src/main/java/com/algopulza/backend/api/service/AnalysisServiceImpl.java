package com.algopulza.backend.api.service;

import com.algopulza.backend.api.dto.CountDto;
import com.algopulza.backend.api.response.*;
import com.algopulza.backend.db.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Transactional
@Service
public class AnalysisServiceImpl implements AnalysisService {

    private final SolvingLogRepository solvingLogRepository;
    private final ProblemRepository problemRepository;
    private final ProblemHasTagRepository problemHasTagRepository;

    @Override
    public List<LanguageAnalysisRes> getLanguageAnalysisList(Long memberId) {
        long totalCount = solvingLogRepository.countByMemberIdAndLanguageIsNotNull(memberId);
        return solvingLogRepository.findLanguageByMemberId(memberId, totalCount);
    }

    @Override
    public List<SolvedCountByYearRes> getSolvedCountAnalysisList(Long memberId) {
        // [{"year": 2022, "month": 1, "solvedCount": 10}, ...] 형태로 조회
        List<SolvedCountByYearAndMonthRes> solvedCountByYearAndMonthResList = solvingLogRepository.countByStatusAndSubmitDate(memberId, "solved");

        // [{"year": 2022, }, ...] 형태로 변환
        Map<Integer, int[]> yearToSolvedCountMap = new HashMap<>();
        List<SolvedCountByYearRes> solvedCountAnalysisList = new LinkedList<>();

        for (SolvedCountByYearAndMonthRes solvedCountByYearAndMonthRes : solvedCountByYearAndMonthResList) {
            int year = solvedCountByYearAndMonthRes.getYear();
            int month = solvedCountByYearAndMonthRes.getMonth();
            long solvedCount = solvedCountByYearAndMonthRes.getSolvedCount();

            if (yearToSolvedCountMap.containsKey(year)) {
                yearToSolvedCountMap.get(year)[month - 1] = (int) solvedCount;
            } else {
                int[] solvedCountArray = new int[12];
                solvedCountArray[month - 1] = (int) solvedCount;
                SolvedCountByYearRes solvedCountByYearRes = new SolvedCountByYearRes(year, solvedCountArray);

                solvedCountAnalysisList.add(solvedCountByYearRes);
                yearToSolvedCountMap.put(year, solvedCountArray);
            }
        }

        return solvedCountAnalysisList;
    }

    @Override
    public SolvingLogStatisticsRes getSolvingLogStatistics(Long memberId) {
        return solvingLogRepository.findStatisticsByMemberId(memberId);
    }

    @Override
    public List<WeaknessRes> getWeaknessList(Long memberId, int count) {
        // 전체 문제 수
        double totalProblemCount = problemRepository.count();
        // 태그별 문제 수 리스트
        List<CountDto> problemCountByTag = problemHasTagRepository.countProblemByTag();
        // 태그별 제출 횟수
        List<CountDto> submitCount = solvingLogRepository.countByTagAndStatus(memberId, null);
        // 태그별 실패 횟수
        List<CountDto> triedCount = solvingLogRepository.countByTagAndStatus(memberId, "tried");

        // 각 태그별 취약점수(tried수 / 제출수) * 태그별 가중치(태그별 문제수 / 전체 문제수)
        Map<Long, Double> weaknessMap = new HashMap<>();
        // 각 태그별 가중치
        List<CountDto> weightList = new LinkedList<>();
        // 가중치가 0인 태그들
        List<CountDto> zeroWeightList = new LinkedList<>();

        for (CountDto countDto : triedCount) {
            weaknessMap.put(countDto.getId(), Double.valueOf(countDto.getCount()));
        }
        for (CountDto countDto : submitCount) {
            if (weaknessMap.containsKey(countDto.getId())) {
                weaknessMap.put(countDto.getId(), (weaknessMap.get(countDto.getId()) / countDto.getCount()));
            }
        }
        for (CountDto countDto : problemCountByTag) {
            Long tagId = countDto.getId();
            long weight = (long) ((countDto.getCount() * 50000) / totalProblemCount);

            weightList.add(new CountDto(tagId, countDto.getName(), weight));

            // 태그별 tried 횟수나 태그별 전체 제출 횟수가 0이라면 취약점 수치 0
            if (weaknessMap.containsKey(tagId)) {
                weaknessMap.put(tagId, weaknessMap.get(tagId) * weight);
            } else {
                zeroWeightList.add(new CountDto(tagId, countDto.getName(), weight));
            }
        }

        // 각 태그별 취약점
        List<WeaknessRes> weaknessResList = new LinkedList<>();
        for (CountDto countDto : weightList) {
            Long tagId = countDto.getId();
            if (weaknessMap.containsKey(tagId)) {
                weaknessResList.add(new WeaknessRes(countDto.getName(), weaknessMap.get(tagId)));
            }
        }

        // 태그별 취약점 내림차순 정렬
        Collections.sort(weaknessResList);

        // 0이 아닌 취약점이 count보다 부족하다면
        if (weaknessResList.size() < count) {
            // 태그별 가중치 내림차순 정렬
            Collections.sort(zeroWeightList);
            int addCount = count - weaknessResList.size();
            for (int i = 0; i < addCount; i++) {
                weaknessResList.add(new WeaknessRes(zeroWeightList.get(i).getName(), zeroWeightList.get(i).getCount() / 1000D));
            }
        }

        return weaknessResList.subList(0, count);
    }

}
