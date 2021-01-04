package com.xebia.learningmanagement.dtos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.xebia.learningmanagement.enums.LearningPathApprovalStatus;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;


@NoArgsConstructor
@AllArgsConstructor
@Data
public class LearningPathManagerDto {

    private Long learningPathEmployeesId;
    private int percentCompleted;
    private EmployeeDto employee;
    private LearningPathManagerApprovalDto learningPath;
    private DurationDto duration;
    private String startDate;
    private String endDate;

}
