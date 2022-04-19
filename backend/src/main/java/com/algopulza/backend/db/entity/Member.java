package com.algopulza.backend.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "member")
public class Member extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tier")
    private Tier tier;

    @Column
    private String name;

    @Column
    private String profileImage;

    @Column
    private int solveCount;

    @Column
    private String email;

    @Column
    private int daysCount;

}
