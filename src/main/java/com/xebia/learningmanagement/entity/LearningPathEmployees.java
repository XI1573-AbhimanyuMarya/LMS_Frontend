package com.xebia.learningmanagement.entity;

import com.xebia.learningmanagement.enums.LearningPathApprovalStatus;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Range;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Getter
@Setter
public class LearningPathEmployees {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private long learningPathEmployeesId;
    @NotNull
    @Range(min = 0, max = 100)
    private int percentCompleted;
    @ManyToOne(cascade = CascadeType.PERSIST)
    private User employee;
    @ManyToOne(cascade = CascadeType.PERSIST)
    private LearningPath learningPath;

    @Column
    private byte[] certificate;
    @Enumerated(EnumType.STRING)
    private LearningPathApprovalStatus approvalStatus;
    @Column(name = "modified_date")
    @LastModifiedDate
    private LocalDateTime modifiedDate;

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
