package com.xebia.learningmanagement.service;

import com.xebia.learningmanagement.dtos.*;

import java.util.List;

public interface AdminService {
    List<AdminDashboardDetailsDTO> dashboardDetails();
    AdminDashboardStatisticsDTO dashboardStatistics();
    List<MadeForEmployeeDto> specificLearningPathDetails(Long learningPathId);

    List<DashboardGraphStatisticsStatusDTO> dashboardGraphStatistics();
}