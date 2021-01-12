package com.xebia.learningmanagement.service;

import com.xebia.learningmanagement.dtos.AdminDashboardStatisticsDTO;
import com.xebia.learningmanagement.dtos.EmployeeLearningPathStatisticsDto;
import com.xebia.learningmanagement.dtos.request.CourseCompletedPercentRequest;
import com.xebia.learningmanagement.dtos.request.EmployeeEmailRequest;
import com.xebia.learningmanagement.dtos.request.LearningPathApprovalRequest;
import com.xebia.learningmanagement.exception.LearningPathException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public interface EmployeeLearningPathService {
    void deleteLearningPath(Map data) throws Exception;

    List<EmployeeLearningPathStatisticsDto> getLearningPathsAssignedToMe(EmployeeEmailRequest employeeEmail) throws LearningPathException;

    AdminDashboardStatisticsDTO dashboardStatistics(EmployeeEmailRequest employeeEmail);

    public Map<String, String> saveOrUpdateCourseRating(CourseCompletedPercentRequest courseCompletedPercent);

    Map<String, String> sendForManagersApproval(LearningPathApprovalRequest approvalRequest) throws Exception;
}
