package com.algopulza.backend.db.entity;

import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity
@Table(name = "problem")
public class Problem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "level")
    private Tier tier;

    @Column
    private int baekjoonId;

    @Column
    private String title;

    @Column
    private boolean solvableFlag;

    @Column
    private int acceptedCount;

    @Column
    private int averageTryCount;

}
