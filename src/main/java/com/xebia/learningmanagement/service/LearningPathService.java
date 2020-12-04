package com.xebia.learningmanagement.service;

import com.xebia.learningmanagement.dtos.ApprovalDto;
import com.xebia.learningmanagement.dtos.LearningPathDto;
import com.xebia.learningmanagement.dtos.ListOfLearningPathsAssignedByManagerDto;
import com.xebia.learningmanagement.dtos.request.AssignLearningPathRequest;
import com.xebia.learningmanagement.dtos.request.LearningPathEmployeeApprovalRequest;
import com.xebia.learningmanagement.dtos.request.ManagerEmailRequest;
import com.xebia.learningmanagement.entity.LearningPath;
import com.xebia.learningmanagement.exception.LearningPathEmployeesException;
import com.xebia.learningmanagement.exception.LearningPathException;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

public interface LearningPathService {

    void createLearningPath(LearningPathDto.Path path) throws Exception;

    /***
     *
     * @param managerEmail
     * @return
     * @throws LearningPathException
     */
    ListOfLearningPathsAssignedByManagerDto getAllAssignedLearningPath(ManagerEmailRequest managerEmail) throws LearningPathException;

    List<ApprovalDto> getPendingApprovals(ManagerEmailRequest managerEmailRequest) throws LearningPathException;

    void approveRequests(LearningPathEmployeeApprovalRequest request) throws Exception;

	Optional<LearningPath> getLearningPathWithCourse(Long assigneeId);

	void saveAssignLearningPaths(AssignLearningPathRequest request) throws Exception;
}
