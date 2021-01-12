package com.xebia.learningmanagement.dtos;

import lombok.Data;


@Data
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
