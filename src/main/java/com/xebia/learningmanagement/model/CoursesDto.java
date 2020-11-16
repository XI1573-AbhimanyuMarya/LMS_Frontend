package com.xebia.learningmanagement.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CoursesDto {
    private String name;
    private String description;
    private List<CategoryDto> category;
}
