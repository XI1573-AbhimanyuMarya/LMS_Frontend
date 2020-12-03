package com.xebia.learningmanagement.service;

import com.xebia.learningmanagement.dtos.*;
import com.xebia.learningmanagement.dtos.request.LearningPathEmployeeApprovalRequest;
import com.xebia.learningmanagement.dtos.request.ManagerEmailRequest;
import com.xebia.learningmanagement.exception.LearningPathEmployeesException;
import com.xebia.learningmanagement.exception.LearningPathException;

import java.util.List;
import java.util.Map;

public interface LearningPathService {

    void createLearningPath(LearningPathDto.Path path) throws Exception;

    /***
     *
     * @param managerEmail
     * @return
     * @throws LearningPathException
     */
    Map<EmployeeDto, List<LearningPathManagerDto>> getAllAssignedLearningPath(ManagerEmailRequest managerEmail) throws LearningPathException;

    List<ApprovalDto> getPendingApprovals(ManagerEmailRequest managerEmailRequest) throws LearningPathException;

    void approveRequests(LearningPathEmployeeApprovalRequest request) throws Exception;
}
