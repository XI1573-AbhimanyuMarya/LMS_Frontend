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
    @Column(name = "id")
    private long learningPathEmployeesId;
    private int percentCompleted;
    @ManyToOne(cascade = CascadeType.PERSIST)
    private User employee;
    @ManyToOne(cascade = CascadeType.PERSIST)
    private LearningPath learningPath;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof LearningPathEmployees)) return false;
        LearningPathEmployees that = (LearningPathEmployees) o;
        return getLearningPathEmployeesId() == that.getLearningPathEmployeesId() &&
                getPercentCompleted() == that.getPercentCompleted() &&
                getEmployee().equals(that.getEmployee()) &&
                getLearningPath().equals(that.getLearningPath());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getLearningPathEmployeesId(), getPercentCompleted(), getEmployee(), getLearningPath());
    }
}
