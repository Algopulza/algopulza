package com.algopulza.backend.db.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Getter
@Setter
@ToString
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
