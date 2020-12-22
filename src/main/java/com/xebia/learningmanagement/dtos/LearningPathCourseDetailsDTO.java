package com.xebia.learningmanagement.dtos;

import com.xebia.learningmanagement.entity.Competency;
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
    private Competency competency;
    private int percentCompleted;
}
