package com.xebia.learningmanagement.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CoursesDto {
    private String name;
    private String description;
    private CategoryDto category;


}
