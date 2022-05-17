package com.algopulza.backend.db.entity;

import lombok.*;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "problem_mark")
public class ProblemMark extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "problem_id")
    private Problem problem;

    @Column
    private int typeFlag;

    public ProblemMark(Member member, Problem problem, int typeFlag) {
        this.member = member;
        this.problem = problem;
        this.typeFlag = typeFlag;
    }

}
