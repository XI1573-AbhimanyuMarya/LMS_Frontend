package com.xebia.learningmanagement.dtos.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Min;

@Getter
@Setter
public class CourseCompletedPercentRequest {

    @Min(value=1,message = "Employee Id cannot be null or Empty")
   private long employeeId;
    @Min(value=1,message = "learningPath Id cannot be null or Empty")
   private long learningPathId;
    @Min(value=1,message = "courseId cannot be null or Empty")
    private long courseId;
    @Min(value=1,message = "percentCompleted cannot be null or Empty")
    private int percentCompleted;
}
