package com.xebia.learningmanagement.service;

import com.xebia.learningmanagement.dtos.EmployeeLearningPathStatisticsDto;
import com.xebia.learningmanagement.dtos.request.CourseCompletedPercentRequest;
import com.xebia.learningmanagement.dtos.request.EmployeeEmailRequest;
import com.xebia.learningmanagement.dtos.request.EmployeeLearningRateRequest;
import com.xebia.learningmanagement.exception.LearningPathException;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
public interface EmployeeLearningPathService {
    void deleteLearningPath(Map data) throws LearningPathException;

    List<EmployeeLearningPathStatisticsDto> getMyAssignedLearningPaths(EmployeeEmailRequest employeeEmail) throws LearningPathException;

    public Map<String, String> saveOrUpdateCourseRating(CourseCompletedPercentRequest courseCompletedPercent) throws Exception;
}
