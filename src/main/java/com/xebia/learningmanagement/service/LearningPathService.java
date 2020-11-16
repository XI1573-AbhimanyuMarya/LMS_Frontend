package com.xebia.learningmanagement.service;

import com.xebia.learningmanagement.dtos.LearningPathDto;
import com.xebia.learningmanagement.dtos.ListOfLearningPathAssignedDto;
import com.xebia.learningmanagement.dtos.request.ManagerEmailRequest;

public interface LearningPathService {

    void createLearningPath(LearningPathDto.Path path) throws Exception;
    ListOfLearningPathAssignedDto getAllAssignedLearningPath(ManagerEmailRequest managerEmail);
}
