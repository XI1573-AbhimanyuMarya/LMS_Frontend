package com.xebia.learningmanagement.service;

import com.xebia.learningmanagement.dtos.request.EmployeeEmailRequest;
import com.xebia.learningmanagement.exception.LearningPathException;
import org.springframework.stereotype.Service;

import java.util.Map;
@Service
public interface EmployeeLearningPathService {
    void deleteLearningPath(Map data) throws LearningPathException;
    void getMyAssignedLearningPaths(EmployeeEmailRequest employeeEmail) throws LearningPathException;
}
