package com.xebia.learningmanagement.service;

import com.xebia.learningmanagement.dtos.AdminDashboardDetailsDTO;
import com.xebia.learningmanagement.dtos.AdminDashboardStatisticsDTO;
import com.xebia.learningmanagement.dtos.DashboardGraphStatisticsStatusDTO;
import com.xebia.learningmanagement.dtos.LearningPathAdminDetailsDTO;

import java.util.List;

public interface AdminService {
    List<AdminDashboardDetailsDTO> dashboardDetails();

    AdminDashboardStatisticsDTO dashboardStatistics();

    List<LearningPathAdminDetailsDTO> specificLearningPathDetails(Long learningPathId);

    List<DashboardGraphStatisticsStatusDTO> dashboardGraphStatistics();
}