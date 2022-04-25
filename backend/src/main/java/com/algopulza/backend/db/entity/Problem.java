package com.algopulza.backend.db.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
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
    private int bojId;

    @Column
    private String title;

    @Column
    private boolean solvableFlag;

    @Column
    private int acceptedCount;

    @Column
    private double averageTryCount;

}
