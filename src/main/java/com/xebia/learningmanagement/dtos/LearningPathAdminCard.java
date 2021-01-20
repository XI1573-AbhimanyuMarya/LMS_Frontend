package com.xebia.learningmanagement.dtos;

import com.xebia.learningmanagement.entity.Competency;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LearningPathAdminCard {
    private Long learningPathId;
    private String name;
    private String description;
    private Competency competency;
}
