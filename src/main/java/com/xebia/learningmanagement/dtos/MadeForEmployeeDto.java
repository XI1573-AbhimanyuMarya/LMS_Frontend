package com.xebia.learningmanagement.dtos;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MadeForEmployeeDto {

    private Long learningPathEmployeesId;
    private int percentCompleted;
    private EmployeeDto employee;
    private DurationDto duration;
    private LocalDate startDate;
    private LocalDate endDate;

}
