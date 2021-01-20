package com.xebia.learningmanagement.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class LearningPathAdminDetailsDTO {
    private Long learningPathEmployeesId;
    private int percentCompleted;
    private EmployeeDto employee;
    private LearningPathAdminCard learningPath;
    private DurationDto duration;
    private String startDate;
    private String endDate;
}
