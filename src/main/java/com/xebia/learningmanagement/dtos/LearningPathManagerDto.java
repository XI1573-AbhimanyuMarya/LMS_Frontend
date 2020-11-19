package com.xebia.learningmanagement.dtos;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class LearningPathManagerDto {

    private Long id;
    private String name;
    private List<MadeForEmployeeDto> madeFor;
    private List<CoursesListDto> courses;
    private DurationDto duration;
    private String startDate;
    private String endDate;

}
