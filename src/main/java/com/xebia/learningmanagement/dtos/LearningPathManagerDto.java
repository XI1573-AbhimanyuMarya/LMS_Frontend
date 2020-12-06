package com.xebia.learningmanagement.dtos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.xebia.learningmanagement.enums.LearningPathApprovalStatus;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@Data
@JsonIgnoreProperties(value = "employee")
public class LearningPathManagerDto {

    private Long learningPathEmployeesId;
    private int percentCompleted;
    private EmployeeDto employee;
    private LearningPathManagerApprovalDto learningPath;
    private DurationDto duration;
    private LocalDate startDate;
    private LocalDate endDate;
    private Boolean isLearningPathExpired;


}
