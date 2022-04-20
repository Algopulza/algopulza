package com.algopulza.backend.db.entity;

import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.Objects;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "problem")
public class Problem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Integer id;

    @Column
    private Integer level;

    @Column
    private Integer baekjoonId;

    @Column
    private String title;

    @Column
    private Boolean solvableFlag = false;

    @Column
    private Integer acceptedCount;

    @Column
    private Double averageTryCount;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Problem problem = (Problem) o;
        return id != null && Objects.equals(id, problem.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}