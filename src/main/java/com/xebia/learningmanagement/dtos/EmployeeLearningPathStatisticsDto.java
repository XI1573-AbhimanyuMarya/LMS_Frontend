package com.xebia.learningmanagement.dtos;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class EmployeeLearningPathStatisticsDto {

    private Long learningPathEmployeesId;
    private int percentCompleted;
    private LearningPathEmployeeDto learningPath;
    private DurationDto duration;
    private LocalDate startDate;
    private LocalDate endDate;
    private Boolean isLearningPathExpired;
}
