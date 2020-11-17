package com.xebia.learningmanagement.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Getter
@Setter
public class LearningPathEmployees {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private int percentCompleted;
    @ManyToOne
    private User employee;
    @ManyToOne(cascade = CascadeType.ALL)
    private LearningPath learningPath;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof LearningPathEmployees)) return false;
        LearningPathEmployees that = (LearningPathEmployees) o;
        return getId() == that.getId() &&
                getPercentCompleted() == that.getPercentCompleted() &&
                getEmployee().equals(that.getEmployee()) &&
                getLearningPath().equals(that.getLearningPath());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getPercentCompleted(), getEmployee(), getLearningPath());
    }
}
