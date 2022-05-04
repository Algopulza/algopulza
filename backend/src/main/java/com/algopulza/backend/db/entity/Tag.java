package com.algopulza.backend.db.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "tag")
public class Tag extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private int bojTagId;

    @Column
    private String bojKey;

    @Column
    private String name;

    @Column
    private String shortName;

}
