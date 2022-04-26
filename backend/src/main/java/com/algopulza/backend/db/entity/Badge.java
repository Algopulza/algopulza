package com.algopulza.backend.db.entity;

import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity
@Table(name = "badge")
public class Badge extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column
    private String badgeImage;

}
