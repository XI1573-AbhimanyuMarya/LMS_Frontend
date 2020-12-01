package com.xebia.learningmanagement.dtos;

import com.xebia.learningmanagement.enums.LearningPathApprovalStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class LearningPathManagerDto {

    private Long learningPathEmployeesId;
    private int percentCompleted;
    private EmployeeDto employee;
    private LearningPathManagerApprovalDto learningPath;
    private DurationDto duration;
    private LocalDate startDate;
    private LocalDate endDate;
    private Boolean isLearningPathExpired;


}
