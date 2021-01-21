package com.xebia.learningmanagement.service;

import com.xebia.learningmanagement.dtos.AdminDashboardDetailsDTO;
import com.xebia.learningmanagement.dtos.DashboardStatisticsDTO;
import com.xebia.learningmanagement.dtos.DashboardGraphStatisticsStatusDTO;
import com.xebia.learningmanagement.dtos.LearningPathAdminDetailsDTO;

import java.util.List;

public interface AdminService {
    List<AdminDashboardDetailsDTO> dashboardDetails();

    DashboardStatisticsDTO dashboardStatistics();

    LearningPathAdminDetailsDTO specificLearningPathDetails(Long learningPathId);

    List<DashboardGraphStatisticsStatusDTO> dashboardGraphStatistics();
}