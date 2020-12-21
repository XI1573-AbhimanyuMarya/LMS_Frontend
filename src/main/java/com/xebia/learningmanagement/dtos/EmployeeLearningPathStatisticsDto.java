package com.xebia.learningmanagement.dtos;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
@Builder
@Getter
@Setter
public class EmployeeLearningPathStatisticsDto {

    private Long learningPathEmployeesId;
    private int percentCompleted;
    private LearningPathEmployeeDto learningPath;
    private DurationDto duration;
    private String startDate;
    private String endDate;
}
