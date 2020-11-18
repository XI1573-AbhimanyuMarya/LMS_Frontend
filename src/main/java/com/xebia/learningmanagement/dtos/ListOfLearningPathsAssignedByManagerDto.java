package com.xebia.learningmanagement.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class ListOfLearningPathsAssignedByManagerDto {
    private List<LearningPathManagerDto> assignedLearningPaths;
}
