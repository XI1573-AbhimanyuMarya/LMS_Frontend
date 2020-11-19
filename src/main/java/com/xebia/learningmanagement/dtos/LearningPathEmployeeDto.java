package com.xebia.learningmanagement.dtos;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class LearningPathEmployeeDto {

    private Long id;
    private String name;
    private EmployeeDto madeBy;
    private List<CoursesListDto> courses;
    private DurationDto duration;
    private String startDate;
    private String endDate;

}
