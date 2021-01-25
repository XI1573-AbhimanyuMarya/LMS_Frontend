package com.xebia.learningmanagement.dtos;

import com.xebia.learningmanagement.entity.Competency;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminManageLearningPathsDTO {
    private Long learningPathId;
    private String name;
    private String description;
    private Competency competency;
    private long coursesCount;
    private long employeesCount;
}
