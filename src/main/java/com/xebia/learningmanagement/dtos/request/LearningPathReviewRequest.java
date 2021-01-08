package com.xebia.learningmanagement.dtos.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class LearningPathEmployeeApprovalRequest {
    @NotNull(message = "Learning Path employee Id can not be Null")
    private Long learningPathEmployeeId;
    @NotBlank(message = "Status can not be blank")
    private String status;
    private String reviewMessage;

}
