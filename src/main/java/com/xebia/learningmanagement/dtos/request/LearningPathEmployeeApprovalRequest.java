package com.xebia.learningmanagement.dtos.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class LearningPathEmployeeApprovalRequest {
    @NotNull
    private Long learningPathEmployeeId;
    @NotBlank
    private String status;
    @NotBlank
    private String reviewMessage;

}
