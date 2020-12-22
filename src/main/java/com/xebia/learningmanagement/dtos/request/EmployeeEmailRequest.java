package com.xebia.learningmanagement.dtos.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
public class EmployeeEmailRequest {
    @NotBlank
    public String employeeEmail;
}
