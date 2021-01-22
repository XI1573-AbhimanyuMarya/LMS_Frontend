package com.xebia.learningmanagement.service;

import com.xebia.learningmanagement.dtos.*;
import com.xebia.learningmanagement.dtos.request.AdminDeleteLearningPathDetails;

import java.util.List;

public interface AdminService {
    List<AdminDashboardDetailsDTO> dashboardDetails();

    DashboardStatisticsDTO dashboardStatistics();

    LearningPathAdminDetailsDTO specificLearningPathDetails(Long learningPathId);

    List<DashboardGraphStatisticsStatusDTO> dashboardGraphStatistics();

    List<AdminManageLearningPathsDTO> manageAssignedLearningPaths();

    void deleteCompletePathAndItsDetails(AdminDeleteLearningPathDetails learningPathIds);
}