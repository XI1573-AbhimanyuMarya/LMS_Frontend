package com.xebia.learningmanagement.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MadeForEmployeeDto {

    private Long id;
    private int percentCompleted;
    private EmployeeDto employee;

}
