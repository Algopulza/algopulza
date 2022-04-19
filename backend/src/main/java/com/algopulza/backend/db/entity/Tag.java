package com.algopulza.backend.db.entity;

import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity
@Table(name = "tag")
public class Tag extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private int bojTagId;

    @Column
    private String key;

    @Column
    private String name;

    @Column
    private String shortName;

}
