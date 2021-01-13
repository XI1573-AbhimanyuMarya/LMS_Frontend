package com.xebia.learningmanagement.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AdminDashboardStatisticsDTO {
    private long totalLearningPathAssigned;
    private double totalLearningPathCompleted;
    private double totalLearningPathInProgress;
    private double totalLearningPathExpired;
}