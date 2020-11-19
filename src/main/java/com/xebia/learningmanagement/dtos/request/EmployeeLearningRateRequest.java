package com.xebia.learningmanagement.dtos.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class EmployeeLearningRateRequest {
    private Integer percentCompleted;
    private Long learningPathEmployeeId;
}
