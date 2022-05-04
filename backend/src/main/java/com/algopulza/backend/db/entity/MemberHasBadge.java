package com.algopulza.backend.db.entity;

import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity
@Table(name = "member_has_badge")
public class MemberHasBadge extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "badge_id")
    private Badge badge;

}
