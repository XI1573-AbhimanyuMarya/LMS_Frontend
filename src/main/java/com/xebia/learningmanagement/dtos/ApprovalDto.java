package com.xebia.learningmanagement.dtos;

import com.xebia.learningmanagement.entity.User;
import com.xebia.learningmanagement.enums.LearningPathApprovalStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
public class ApprovalDto {

    private Long learningPathEmployeesId;
    private int percentCompleted;
    private EmployeeDto employee;
    private LearningPathManagerApprovalDto learningPath;
    private LearningPathApprovalStatus approvalStatus;
//    private LocalDateTime modifiedDate;
    private DurationDto duration;
    // Refers to Learning Path start Date and End Date
    private LocalDate startDate;
    private LocalDate endDate;
//    private Boolean isLearningPathExpired;
//    private String certificate;
}
