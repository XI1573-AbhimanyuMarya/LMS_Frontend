package com.xebia.learningmanagement.entity;

import com.xebia.learningmanagement.enums.LearningPathApprovalStatus;
import lombok.Data;
import org.hibernate.validator.constraints.Range;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
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

    @Enumerated(EnumType.STRING)
    private LearningPathApprovalStatus approvalStatus;

    @ManyToOne
    private Duration duration;

    @Column(name = "start_Date")
    private LocalDate startDate;

    @Column(name = "end_Date")
    private LocalDate endDate;

}
