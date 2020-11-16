package com.xebia.learningmanagement.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmployeeDto {
    private Long id;
    private String fullName;
    private String empID;
    private String username;
    private String designation;
    private String location;
    private String cOEType;
    private boolean active;
}
