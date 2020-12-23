package com.xebia.learningmanagement.dtos.request;


import com.xebia.learningmanagement.entity.Duration;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.util.List;
import java.util.Map;

@Getter
@Setter
public class AssignLearningPathRequest {

    @NotEmpty(message = "Learning Path Ids can not be empty")
    private Map<Long,Duration> learningPathIds;
    @NotEmpty(message = "Employee Ids Ids can not be empty")
    private List<Long> employeeIds;


}
