package com.xebia.learningmanagement.dtos.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Min;

@Getter
@Setter
public class CourseCompletedPercentRequest {

    @Min(value=1)
   private long employeeId;
    @Min(value=1)
   private long learningPathId;
    @Min(value=1)
    private long courseId;
    @Min(value=1)
    private int percentCompleted;
}
