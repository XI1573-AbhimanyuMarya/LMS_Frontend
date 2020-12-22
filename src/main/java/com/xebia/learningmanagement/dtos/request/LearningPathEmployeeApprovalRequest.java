package com.xebia.learningmanagement.dtos.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LearningPathEmployeeApprovalRequest {
    private Long learningPathEmployeeId;
    private String status;
    private String reviewMessage;

}
