package com.xebia.learningmanagement.dtos.request;


import com.xebia.learningmanagement.entity.Duration;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.util.List;

@Getter
@Setter
public class AssignLearningPathRequest {

    @NotEmpty
    private List<Long> learningPathIds;
    @NotEmpty
    private List<Long> employeeIds;
    @NotBlank
    private Duration duration;
    
}
