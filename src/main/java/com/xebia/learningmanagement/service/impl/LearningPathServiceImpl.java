package com.xebia.learningmanagement.service.impl;

import com.xebia.learningmanagement.entity.*;
import com.xebia.learningmanagement.exception.LearningPathException;
import com.xebia.learningmanagement.model.LearningPathDto;
import com.xebia.learningmanagement.repository.*;
import com.xebia.learningmanagement.service.LearningPathService;
import com.xebia.learningmanagement.util.EmailSend;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;

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

    @Autowired
    EmailSend emailSend;

    @Override
    public void createLearningPath(LearningPathDto.Path path) throws Exception {
        LearningPath learningPath = new LearningPath();

        Optional<Duration> duration = durationRepository.findById(path.getDuration());
        if (!duration.isPresent()) {
            throw new LearningPathException(String.format("duration not available"));
        }

        Optional<User> madeBy = userRepository.findById(path.getMadeById());
        if (!madeBy.isPresent()) {
            throw new LearningPathException(String.format("made by user not available"));
        }

        for (int i = 0; i < path.getCoursesId().size(); i++) {
            Optional<Courses> courses = courseRepository.findById(path.getCoursesId().get(i));
            if (!courses.isPresent()) {
                throw new LearningPathException(String.format("given course not found by id"));
            }
        }

        for (int i = 0; i < path.getMadeForId().size(); i++) {
            Optional<User> user = userRepository.findById(path.getMadeForId().get(i));
            if (!user.isPresent()) {
                throw new LearningPathException(String.format("given user not found by id"));
            }
        }

        learningPath.setDuration(durationRepository.findById(path.getDuration()).get());
        learningPath.setMadeBy(userRepository.findById(path.getMadeById()).get());
        learningPath.setName(path.getName());
        learningPath.setCourses(courseRepository.findAllById(path.getCoursesId()));
        learningPathRepository.save(learningPath);

        for (Long id : path.getMadeForId()) {
            User user = userRepository.findById(id).get();
            LearningPathEmployees learningPathEmployees = new LearningPathEmployees();
            learningPathEmployees.setLearningPath(learningPath);
            learningPathEmployees.setEmployee(user);
            learningPathEmployees.setPercentCompleted(0);
            learningPathEmployeesRepository.save(learningPathEmployees);


            //TODO : Send Email to concerned User

            User madeByUser = userRepository.findById(path.getMadeById()).orElseThrow(() -> new NotFoundException());
            String madeByUserFullName = madeByUser.getFullName().concat(" : "+madeByUser.getEmpID());

            //List of courses made for Employee
            List<Courses> coursesListById = courseRepository.findAllById(path.getCoursesId());
            List<String> stringList = coursesListById.stream().map(Courses::getName).map(String::toUpperCase).collect(Collectors.toList());
            // Courses mapped to their Category
            Map<String, String> courseCategoryMap = new HashMap<>();
            coursesListById.forEach(course -> {
                courseCategoryMap.put(course.getName(), course.getCategory().getName());
            });
            //todo Send Email without template
           /* EmailSend.setEmail(user.getUsername(), "LMS PORTAL",
                    "You have been assigned below mentioned Courses by " + madeByUserFullName + " \n " + stringList +
                            "\n Timeline for Completion of the course is : " + path.getDuration() + "Months"
            );*/

            //todo Set Email Properties
            setMailPropertiesAndSendEmail(user, path, madeByUserFullName, stringList);

        }


    }

    private void setMailPropertiesAndSendEmail(User user, LearningPathDto.Path path, String madeByUserFullName, List<String> stringList) throws Exception {

        Map<String, String> model = new HashMap<>();
        String appendedCourses = stringList.stream().collect(Collectors.joining(", \n"));
        model.put("learningPathName",path.getName());
        model.put("Email", user.getUsername());
        model.put("madeFor", user.getFullName());
        model.put("madeBy", madeByUserFullName);
        model.put("timeline", String.valueOf(path.getDuration()));
        model.put("assignedCourse", appendedCourses);

        emailSend.sendEmailMethodUsingTemplate(model);
    }


}
