package com.xebia.learningmanagement.service.impl;

import com.xebia.learningmanagement.entity.Duration;
import com.xebia.learningmanagement.entity.LearningPath;
import com.xebia.learningmanagement.entity.LearningPathEmployees;
import com.xebia.learningmanagement.entity.User;
import com.xebia.learningmanagement.model.Path;
import com.xebia.learningmanagement.repository.*;
import com.xebia.learningmanagement.service.LearningPathService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LearningPathServiceImpl implements LearningPathService {

    @Autowired
    LearningPathRepository learningPathRepository;

    @Autowired
    DurationRepository durationRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CourseRepository courseRepository;

    @Autowired
    LearningPathEmployeesRepository learningPathEmployeesRepository;

    @Override
    public void createLearningPath(Path path) {
        LearningPath learningPath = new LearningPath();
        learningPath.setDuration(durationRepository.findById(path.getDuration()).get());
        learningPath.setMadeBy(userRepository.findById(path.getMadeById()).get());
        learningPath.setName(path.getName());
        learningPath.setCourses(courseRepository.findAllById(path.getCoursesId()));
        learningPathRepository.save(learningPath);

        for (Long id:path.getMadeForId()){
            User user = userRepository.findById(id).get();
            LearningPathEmployees learningPathEmployees = new LearningPathEmployees();
            learningPathEmployees.setLearningPath(learningPath);
            learningPathEmployees.setEmployee(user);
            learningPathEmployees.setPercentCompleted(0);
            learningPathEmployeesRepository.save(learningPathEmployees);
        }
    }
}
