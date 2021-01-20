package com.xebia.learningmanagement.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class LearningPathAdminDetailsDTO {
    private LearningPathAdminCard learningPath;
    private List<MadeForEmployeeDto> employeeDetails;
}
