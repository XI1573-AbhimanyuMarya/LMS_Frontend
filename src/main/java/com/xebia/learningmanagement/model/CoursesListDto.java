package com.xebia.learningmanagement.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CoursesListDto {
    private List<CoursesDto> coursesDtos;
}
