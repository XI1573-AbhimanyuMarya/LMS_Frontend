package com.xebia.learningmanagement.dtos;

import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LearningPathCourseDetailsDTO {
    private Long id;
    private String name;
    private String description;
    private CategoryDto category;
    private int percentCompleted;
}
