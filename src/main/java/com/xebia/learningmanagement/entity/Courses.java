package com.xebia.learningmanagement.entity;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Getter
@Setter
@Table(name = "Courses")
public class Courses {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;

    @ManyToOne
    private Category category;

    @ManyToOne
    private Competency competency;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Courses)) return false;
        Courses courses = (Courses) o;
        return Objects.equals(getId(), courses.getId()) &&
                getName().equals(courses.getName()) &&
                Objects.equals(getDescription(), courses.getDescription()) &&
                getCategory().equals(courses.getCategory()) &&
                Objects.equals(getCompetency(), courses.getCompetency());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getName(), getDescription(), getCategory(), getCompetency());
    }
}
