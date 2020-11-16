package com.xebia.learningmanagement.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CoursesDto {
    private String name;
    private String description;
    private CategoryDto category;


}
