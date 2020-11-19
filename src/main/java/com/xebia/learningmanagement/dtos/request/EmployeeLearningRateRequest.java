package com.xebia.learningmanagement.dtos.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmployeeLearningRateRequest {
    private Integer percentCompleted;
    private Long learningPathEmployeeId;
}
