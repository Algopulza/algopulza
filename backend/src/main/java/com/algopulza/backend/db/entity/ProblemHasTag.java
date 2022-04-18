package com.algopulza.backend.db.entity;

import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity
@Table(name = "problem_has_tag")
public class ProblemHasTag extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "problem_id")
    private Problem problem;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tag_id")
    private Tag tag;

}
