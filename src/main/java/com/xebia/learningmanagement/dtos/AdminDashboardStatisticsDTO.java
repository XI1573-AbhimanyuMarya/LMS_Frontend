package com.xebia.learningmanagement.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AdminDashboardStatisticsDTO {
    private long totalLearningPathAssigned;
    private long totalLearningPathCompleted;
    private long totalLearningPathInProgress;
    private long totalLearningPathExpired;
}