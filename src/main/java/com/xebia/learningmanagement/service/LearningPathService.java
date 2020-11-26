package com.xebia.learningmanagement.service;

import com.xebia.learningmanagement.dtos.ApprovalDto;
import com.xebia.learningmanagement.dtos.LearningPathDto;
import com.xebia.learningmanagement.dtos.ListOfLearningPathsAssignedByManagerDto;
import com.xebia.learningmanagement.dtos.request.ManagerEmailRequest;
import com.xebia.learningmanagement.exception.LearningPathException;

import java.util.List;

public interface LearningPathService {

    void createLearningPath(LearningPathDto.Path path) throws Exception;

    /***
     *
     * @param managerEmail
     * @return
     * @throws LearningPathException
     */
    ListOfLearningPathsAssignedByManagerDto getAllAssignedLearningPath(ManagerEmailRequest managerEmail) throws LearningPathException;

    List<ApprovalDto> getPendingApprovals(ManagerEmailRequest managerEmailRequest);
}
