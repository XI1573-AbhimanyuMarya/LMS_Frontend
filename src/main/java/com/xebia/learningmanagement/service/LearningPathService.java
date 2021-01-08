package com.xebia.learningmanagement.service;

import com.xebia.learningmanagement.dtos.ApprovalDto;
import com.xebia.learningmanagement.dtos.LearningPathCourseDetailsDTO;
import com.xebia.learningmanagement.dtos.LearningPathDto;
import com.xebia.learningmanagement.dtos.LearningPathManagerDto;
import com.xebia.learningmanagement.dtos.request.AssignLearningPathRequest;
import com.xebia.learningmanagement.dtos.request.LearningPathReviewRequest;
import com.xebia.learningmanagement.dtos.request.ManagerEmailRequest;
import com.xebia.learningmanagement.entity.LearningPath;
import com.xebia.learningmanagement.exception.LearningPathException;

import java.util.List;
import java.util.Map;

public interface LearningPathService {

    void createLearningPath(LearningPathDto.Path path) throws Exception;

    Map<Long, List<LearningPathManagerDto>> manageAssignedLearningPaths(ManagerEmailRequest managerEmail) throws LearningPathException;

    List<ApprovalDto> getPendingApprovals(ManagerEmailRequest managerEmailRequest) throws LearningPathException;

    void approveRequests(LearningPathReviewRequest request) throws Exception;

    List<LearningPath> getLearningPathWithCourse(Long assigneeId);

    void saveAssignLearningPaths(AssignLearningPathRequest request) throws Exception;

    List<LearningPathCourseDetailsDTO> getCourseDetails(Long learningPathId, Long employeeId ,Long learningPathEmployeesId);
}
