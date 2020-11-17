package com.xebia.learningmanagement.dtos;

import com.xebia.learningmanagement.dtos.EmployeeDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MadeForEmployeeDto {

    private Long id;
    private int percentCompleted;
    private EmployeeDto employee;

}