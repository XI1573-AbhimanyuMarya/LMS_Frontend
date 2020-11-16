package com.xebia.learningmanagement.service;

import com.xebia.learningmanagement.model.LearningPathDto;
import com.xebia.learningmanagement.model.LearningPathListListDto;
import com.xebia.learningmanagement.model.ManagerUsernameDto;

public interface LearningPathService {

    void createLearningPath(LearningPathDto.Path path) throws Exception;
    LearningPathListListDto getAllAssignedLearningPath(ManagerUsernameDto managerUsernameDto);
}
