package com.xebia.learningmanagement.dtos;

import com.xebia.learningmanagement.dtos.EmployeeDto;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class MadeForEmployeeDto {

    private Long learningPathEmployeesId;
    private int percentCompleted;
    private EmployeeDto employee;
    private DurationDto duration;
    private LocalDate startDate;
    private LocalDate endDate;
//    private Boolean isLearningPathExpired;

}
