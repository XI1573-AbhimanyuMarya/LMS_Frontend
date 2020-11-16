package com.xebia.learningmanagement.service;

import com.xebia.learningmanagement.model.LearningPathDto;
import com.xebia.learningmanagement.model.ListOfLearningPathAssignedDto;
import com.xebia.learningmanagement.model.ManagerUsernameDto;

public interface LearningPathService {

    void createLearningPath(LearningPathDto.Path path) throws Exception;
    ListOfLearningPathAssignedDto getAllAssignedLearningPath(ManagerUsernameDto managerUsernameDto);
}
