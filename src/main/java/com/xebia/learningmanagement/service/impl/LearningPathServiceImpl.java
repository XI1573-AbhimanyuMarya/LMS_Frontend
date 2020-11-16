package com.xebia.learningmanagement.service.impl;

import com.xebia.learningmanagement.entity.*;
import com.xebia.learningmanagement.enums.EmailType;
import com.xebia.learningmanagement.exception.LearningPathException;
import com.xebia.learningmanagement.exception.UsernameNotFoundException;
import com.xebia.learningmanagement.dtos.LearningPathDto;
import com.xebia.learningmanagement.dtos.LearningPathListDto;
import com.xebia.learningmanagement.dtos.ListOfLearningPathAssignedDto;
import com.xebia.learningmanagement.repository.*;
import com.xebia.learningmanagement.dtos.request.ManagerEmailRequest;
import com.xebia.learningmanagement.service.LearningPathService;
import com.xebia.learningmanagement.util.EmailSend;
import org.modelmapper.ModelMapper;
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
    protected LearningPathRepository learningPathRepository;

    @Autowired
    protected DurationRepository durationRepository;

    @Autowired
    protected UserRepository userRepository;

    @Autowired
    protected CourseRepository courseRepository;

    @Autowired
    protected LearningPathEmployeesRepository learningPathEmployeesRepository;

    @Autowired
    protected EmailSend emailSend;


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
        // Set Learning path
        learningPath.setDuration(durationRepository.findById(path.getDuration()).get());
        learningPath.setMadeBy(userRepository.findById(path.getMadeById()).get());
        learningPath.setName(path.getName());
        learningPath.setCourses(courseRepository.findAllById(path.getCoursesId()));

        getTemplatePlaceholderValuesAndSaveData(path, learningPath);

//        Save learning Path After the mail & mapping between Learning path : Employee has been saved
//        learningPathRepository.save(learningPath);

    }

    private void getTemplatePlaceholderValuesAndSaveData(LearningPathDto.Path path, LearningPath learningPath) throws Exception {


        for (Long id : path.getMadeForId()) {
            User user = userRepository.findById(id).get();
            LearningPathEmployees learningPathEmployees = new LearningPathEmployees();
            learningPathEmployees.setLearningPath(learningPath);
            learningPathEmployees.setEmployee(user);
            learningPathEmployees.setPercentCompleted(0);

            //TODO : Send Email to concerned User
            User madeByUser = userRepository.findById(path.getMadeById()).orElseThrow(() -> new NotFoundException());
            String madeByUserFullName = madeByUser.getFullName().concat(" : " + madeByUser.getEmpID());

            //List of courses made for Employee
            List<Courses> coursesListById = courseRepository.findAllById(path.getCoursesId());
            List<String> stringList = coursesListById.stream().map(Courses::getName).map(String::toUpperCase).collect(Collectors.toList());

            //todo Send Email without template
           /* EmailSend.setEmail(user.getUsername(), "LMS PORTAL",
                    "You have been assigned below mentioned Courses by " + madeByUserFullName + " \n " + stringList +
                            "\n Timeline for Completion of the course is : " + path.getDuration() + "Months"
            );*/

            //todo Set Email Properties
            try {
                setMailPropertiesAndSendEmail(user, path, madeByUserFullName, stringList);

            } catch (Exception e) {
                throw new Exception("Unable to send Email & Save data");
            }
            //Save Learning path for Employee after the Email Mail has been sent
            learningPathEmployeesRepository.save(learningPathEmployees);

        }

    }


    private void setMailPropertiesAndSendEmail(User user, LearningPathDto.Path path, String madeByUserFullName, List<String> stringList) throws Exception {

        Map<String, String> model = new HashMap<>();
        String appendedCourses = stringList.stream().collect(Collectors.joining(", \n"));
        model.put("learningPathName", path.getName());
        model.put("Email", user.getUsername());
        model.put("madeFor", user.getFullName());
        model.put("madeBy", madeByUserFullName);
        model.put("timeline", String.valueOf(path.getDuration()));
        model.put("assignedCourse", appendedCourses);

        emailSend.sendEmailMethodUsingTemplate(EmailType.LEARNING_PATH_ASSIGN.getValue(), model);
    }


    @Override
    public ListOfLearningPathAssignedDto getAllAssignedLearningPath(ManagerEmailRequest managerEmail) throws LearningPathException {
        ModelMapper modelMapper = new ModelMapper();
        User user = userRepository.findByUsername(managerEmail.getManagerEmail()).orElseThrow(() -> new UsernameNotFoundException("UserEmail does not exist"));
        List<LearningPath> learningPathList = learningPathRepository.findAll().stream().filter(a -> a.getMadeBy().equals(user)).collect(Collectors.toList());
        return new ListOfLearningPathAssignedDto(learningPathList.stream().map(a -> modelMapper.map(a, LearningPathListDto.class)).collect(Collectors.toList()));
    }
}
