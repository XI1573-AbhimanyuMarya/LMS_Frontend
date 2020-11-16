package com.xebia.learningmanagement.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class LearningPathListDto {

    private Long id;
    private String name;
    private List<MadeForEmployeeDto> madeFor;
    private List<CoursesListDto> courses;
    private DurationDto duration;

}
