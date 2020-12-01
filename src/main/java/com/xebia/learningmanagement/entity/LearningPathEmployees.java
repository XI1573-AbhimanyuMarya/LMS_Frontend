package com.xebia.learningmanagement.entity;

import com.xebia.learningmanagement.enums.LearningPathApprovalStatus;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Range;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;

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

    @Column
    private byte[] certificate;
    @Enumerated(EnumType.STRING)
    private LearningPathApprovalStatus approvalStatus;
    @Column(name = "modified_date")
    @LastModifiedDate
    private LocalDateTime modifiedDate;

    @ManyToOne
    private Duration duration;

    @Column(name = "start_Date")
    private LocalDate startDate;

    @Column(name = "end_Date")
    private LocalDate endDate;

    @Column(name = "isExpired")
    private Boolean isLearningPathExpired = Boolean.FALSE;;

}
