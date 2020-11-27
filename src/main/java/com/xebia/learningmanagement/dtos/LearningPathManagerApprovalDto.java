package com.xebia.learningmanagement.dtos;

import com.xebia.learningmanagement.entity.User;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class LearningPathManagerApprovalDto {
    private Long learningPathId;
    private String name;
//    private EmployeeDto employee;
    private List<CoursesListDto> courses;
    private DurationDto duration;
    private LocalDate startDate;
    private LocalDate endDate;
    private Boolean isLearningPathExpired;

}
