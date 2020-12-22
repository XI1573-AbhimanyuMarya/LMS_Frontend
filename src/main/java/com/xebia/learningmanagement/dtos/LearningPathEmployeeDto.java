package com.xebia.learningmanagement.dtos;

import com.xebia.learningmanagement.entity.Competency;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class LearningPathEmployeeDto {

    private Long learningPathId;
    private String name;
    private String description;
    private Competency competency;
    private EmployeeDto madeBy;
    public List<CoursesDto> courses;


}
