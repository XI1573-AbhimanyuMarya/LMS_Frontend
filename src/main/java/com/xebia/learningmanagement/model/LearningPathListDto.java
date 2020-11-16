package com.xebia.learningmanagement.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class LearningPathListDto {

    private Long id;
    private String name;
    private List<MadeForEmployeeDto> madeFor;
    private List<CoursesListDto> courses;
    private DurationDto duration;

}
