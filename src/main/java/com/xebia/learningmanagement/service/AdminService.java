package com.xebia.learningmanagement.service;

import com.xebia.learningmanagement.dtos.AdminDashboardDetailsDTO;
import com.xebia.learningmanagement.dtos.AdminDashboardStatisticsDTO;
import com.xebia.learningmanagement.dtos.DashboardGraphStatisticsDTO;
import com.xebia.learningmanagement.dtos.MadeForEmployeeDto;

import java.util.List;

public interface AdminService {
    List<AdminDashboardDetailsDTO> dashboardDetails();
    AdminDashboardStatisticsDTO dashboardStatistics();
    List<MadeForEmployeeDto> specificLearningPathDetails(Long learningPathId);

    List<DashboardGraphStatisticsDTO> dashboardGraphStatistics(String month);
}