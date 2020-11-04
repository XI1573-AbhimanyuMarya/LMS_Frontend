package com.xebia.learningmanagement.service;

import com.xebia.learningmanagement.model.LearningPathDto;

import static org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;

public interface LearningPathService {

    void createLearningPath(LearningPathDto.Path path) throws NotFoundException;
}
