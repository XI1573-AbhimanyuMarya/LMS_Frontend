package com.xebia.learningmanagement.service.impl;

import com.xebia.learningmanagement.exception.LearningPathException;
import com.xebia.learningmanagement.repository.LearningPathEmployeesRepository;
import com.xebia.learningmanagement.repository.LearningPathRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class UpdateLearningPathExpiredService {
    @Autowired
    protected LearningPathEmployeesRepository learningPathEmployeesRepository;


    //    @Scheduled(fixedDelay = 10000)
    @Scheduled(cron = "0 1 1 * * ?")
    public void updateIsLearningPathExpired() throws LearningPathException {
        try {
            learningPathEmployeesRepository.updateIsExpiredOfLearningPath();
            log.info("isExpired of Learning path Updated");
        } catch (LearningPathException e) {
            throw new LearningPathException("Failed to update isExpired in Learning Path");
        }

    }


}
