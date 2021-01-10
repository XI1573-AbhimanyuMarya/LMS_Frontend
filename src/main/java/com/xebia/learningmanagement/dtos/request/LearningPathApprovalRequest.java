package com.xebia.learningmanagement.dtos.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Min;

@Getter
@Setter
public class LearningPathApprovalRequest {
    @Min(value=1,message = "Employee Id cannot be null or Empty")
    private long employeeId;
    @Min(value=1,message = "learningPath Id cannot be null or Empty")
    private long learningPathId;

}
