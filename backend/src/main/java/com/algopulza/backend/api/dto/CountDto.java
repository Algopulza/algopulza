package com.algopulza.backend.api.dto;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class CountDto implements Comparable<CountDto> {

    private Long id;

    private String name;

    private Long count;

    // 내림차순 정렬
    @Override
    public int compareTo(CountDto o) {
        return this.count >= o.count ? -1 : 1;
    }
}
