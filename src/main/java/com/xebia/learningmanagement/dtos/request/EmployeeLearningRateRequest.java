package com.xebia.learningmanagement.dtos.request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class EmployeeLearningRateRequest {
    private Integer percentCompleted;
    private Long learningPathEmployeeId;
    private MultipartFile file;
}
