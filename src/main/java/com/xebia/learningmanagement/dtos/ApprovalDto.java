package com.xebia.learningmanagement.dtos;

import com.xebia.learningmanagement.entity.User;
import com.xebia.learningmanagement.enums.LearningPathApprovalStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ApprovalDto {

    private Long learningPathEmployeesId;
    private int percentCompleted;
    private LearningPathManagerApprovalDto learningPath;
    private String certificate;
    private LearningPathApprovalStatus approvalStatus;
    private LocalDateTime modifiedDate;
}
