package com.algopulza.backend.api.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WeaknessRes implements Comparable<WeaknessRes> {

    private String text;

    private double value;

    // 내림차순 정렬
    @Override
    public int compareTo(WeaknessRes o) {
        return this.value >= o.value ? -1 : 1;
    }
}
