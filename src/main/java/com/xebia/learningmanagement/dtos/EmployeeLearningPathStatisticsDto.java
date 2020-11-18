package com.xebia.learningmanagement.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmployeeLearningPathStatisticsDto {

    private Long id;
    private int percentCompleted;
    private LearningPathEmployeeDto learningPath;
}
