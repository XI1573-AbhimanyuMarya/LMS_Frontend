package com.xebia.learningmanagement.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
@Getter
@Setter
public class LearningPath {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String name;
    @ManyToOne
    private User madeBy;
    @OneToMany(mappedBy = "learningPath", orphanRemoval = true)
    private List<LearningPathEmployees> madeFor;
    @ManyToMany
    private List<Courses> courses;
    @ManyToOne
    private Duration duration;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof LearningPath)) return false;
        LearningPath that = (LearningPath) o;
        return Objects.equals(getName(), that.getName()) &&
                getMadeBy().equals(that.getMadeBy()) &&
                Objects.equals(getMadeFor(), that.getMadeFor()) &&
                Objects.equals(getCourses(), that.getCourses()) &&
                Objects.equals(getDuration(), that.getDuration());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getName(), getMadeBy(), getMadeFor(), getCourses(), getDuration());
    }
}