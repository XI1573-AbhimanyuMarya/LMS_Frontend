package com.xebia.learningmanagement.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MadeForEmployeeDto {

    private Long id;
    private int percentCompleted;
    private List<EmployeeDto> employee;

}
