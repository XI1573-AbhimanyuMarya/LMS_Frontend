package com.xebia.learningmanagement.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class ListOfLearningPathAssignedDto {
    private List<LearningPathListDto> assignedLearningPaths;
}
