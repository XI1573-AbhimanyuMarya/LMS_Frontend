package com.xebia.learningmanagement.service.impl;

import com.xebia.learningmanagement.dtos.DurationDto;
import com.xebia.learningmanagement.dtos.EmployeeLearningPathStatisticsDto;
import com.xebia.learningmanagement.dtos.LearningPathDto;
import com.xebia.learningmanagement.dtos.LearningPathEmployeeDto;
import com.xebia.learningmanagement.dtos.request.CourseCompletedPercentRequest;
import com.xebia.learningmanagement.dtos.request.EmployeeEmailRequest;
import com.xebia.learningmanagement.dtos.request.EmployeeLearningRateRequest;
import com.xebia.learningmanagement.entity.CourseRating;
import com.xebia.learningmanagement.entity.Courses;
import com.xebia.learningmanagement.entity.LearningPathEmployees;
import com.xebia.learningmanagement.entity.User;
import com.xebia.learningmanagement.enums.EmailType;
import com.xebia.learningmanagement.exception.LearningPathEmployeesException;
import com.xebia.learningmanagement.exception.LearningPathException;
import com.xebia.learningmanagement.exception.UsernameNotFoundException;
import com.xebia.learningmanagement.repository.CourseRatingRepository;
import com.xebia.learningmanagement.repository.LearningPathEmployeesRepository;
import com.xebia.learningmanagement.repository.UserRepository;
import com.xebia.learningmanagement.service.EmployeeLearningPathService;
import com.xebia.learningmanagement.util.EmailSend;
import com.xebia.learningmanagement.util.ErrorBank;
import com.xebia.learningmanagement.util.MessageBank;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

import static com.xebia.learningmanagement.enums.LearningPathApprovalStatus.PENDING;

@Service
@Slf4j
public class EmployeeLearningPathServiceImpl implements EmployeeLearningPathService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private LearningPathEmployeesRepository learningPathEmployeesRepository;
    @Autowired
    private LearningPathServiceImpl serviceimpl;
    @Autowired
    private EmailSend emailSend;
    @Autowired
    private CourseRatingRepository courseRatingRepository;
    @Autowired
    private ModelMapper modelMapper;


    /***
     *
     * @param data
     * @throws LearningPathException
     */
    @Override
    public void deleteLearningPath(Map data) throws LearningPathException {
        Map<String, String> emailcontent = new HashMap<>();
        List<String> employeeLearningpathids = null;
        LearningPathEmployees learningpathemployees = null;
        try {
            employeeLearningpathids = (List) data.get("ids");
            if (employeeLearningpathids != null) {
                for (int i = 0; i < employeeLearningpathids.size(); i++) {
                    String id = String.valueOf(employeeLearningpathids.get(i));
                    learningpathemployees = learningPathEmployeesRepository.findById(Long.valueOf(id)).orElse(null);
                    if (learningpathemployees != null) {
                        emailcontent = setMailProperties(learningpathemployees);
                        learningPathEmployeesRepository.deleteById(learningpathemployees.getLearningPathEmployeesId());
                        emailSend.sendEmailMethodUsingTemplate(EmailType.LEARNING_PATH_DISCARD.getValue(), emailcontent);
                    } else {
                        throw new LearningPathException(MessageBank.NO_DATA_FOUND);
                    }
                }
            } else {
                throw new LearningPathException(ErrorBank.ERROR_WHILE_DELETING);
            }
        } catch (LearningPathException l) {
            throw new LearningPathException(l.getLocalizedMessage());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /***
     * @param employeeEmail
     * @return
     * @throws LearningPathException
     */
    @Override
    public List<EmployeeLearningPathStatisticsDto> getMyAssignedLearningPaths(EmployeeEmailRequest employeeEmail) throws LearningPathException {

        User user = userRepository.findByUsername(employeeEmail.getEmployeeEmail()).orElseThrow(() -> new UsernameNotFoundException("UserEmail does not exist"));
        List<LearningPathEmployees> learningPathEmployees = learningPathEmployeesRepository.findByEmployee(user);

        List<EmployeeLearningPathStatisticsDto> employeeLearningPathStatisticsDtoList = new ArrayList<>();

        for (LearningPathEmployees learningPath : learningPathEmployees) {

            EmployeeLearningPathStatisticsDto employeeLearningPathStatisticsDto = EmployeeLearningPathStatisticsDto.builder()
                    .learningPathEmployeesId(learningPath.getLearningPathEmployeesId())
                    .isLearningPathExpired(learningPath.getIsLearningPathExpired())
                    .duration(new DurationDto(learningPath.getDuration().getName()))
                    .learningPath(modelMapper.map(learningPath.getLearningPath(), LearningPathEmployeeDto.class))
                    .endDate(learningPath.getEndDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")))
                    .startDate(learningPath.getStartDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")))
                    .percentCompleted(courseCompletionAverage(learningPath.getEmployee().getId(), learningPath.getLearningPath().getId()))
                    .build();

            employeeLearningPathStatisticsDtoList.add(employeeLearningPathStatisticsDto);
        }


        return employeeLearningPathStatisticsDtoList;
    }

    @Override
    public EmployeeLearningPathStatisticsDto updateLearningPathProgress(EmployeeLearningRateRequest employeeLearningRateRequest) throws LearningPathException, IOException {

        LearningPathEmployees learningPathEmployees = learningPathEmployeesRepository.findById((long) employeeLearningRateRequest.getLearningPathEmployeeId()).orElseThrow(() -> new LearningPathEmployeesException("LearningPath Employee Id not found"));
        learningPathEmployees.setPercentCompleted(employeeLearningRateRequest.getPercentCompleted());
        if (Objects.nonNull(employeeLearningRateRequest.getFile())) {
            learningPathEmployees.setCertificate(employeeLearningRateRequest.getFile().getBytes());
        } else {
            learningPathEmployees.setCertificate(null);
        }
        learningPathEmployees.setApprovalStatus(PENDING);
        learningPathEmployees.setModifiedDate(LocalDateTime.now());
        LearningPathEmployees updatedLearningPathEmployee = learningPathEmployeesRepository.saveAndFlush(learningPathEmployees);
        return modelMapper.map(updatedLearningPathEmployee, EmployeeLearningPathStatisticsDto.class);
    }


    /***
     *
     * @param learningpathemployees
     * @return
     */
    public Map setMailProperties(LearningPathEmployees learningpathemployees) {
        Map<String, String> emailcontent = new HashMap<>();
        List<Courses> courselist = null;
        StringBuilder courses = new StringBuilder();
        try {
            courselist = learningpathemployees.getLearningPath().getCourses();
            if (courselist != null) {
                for (int i = 0; i < courselist.size(); i++) {
                    Courses course = courselist.get(i);
                    courses.append(course.getDescription().toString());
                }
            }
            emailcontent.put("Email", learningpathemployees.getEmployee().getUsername());
            emailcontent.put("learningPathName", learningpathemployees.getLearningPath().getName());
            emailcontent.put("madeFor", learningpathemployees.getEmployee().getFullName());
            emailcontent.put("assignedCourse", courses.toString());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return emailcontent;
    }

    @Override
    public Map<String, String> addCourseRating(CourseCompletedPercentRequest courseCompletedPercent) {
        Map<String, String> message = new HashMap<>();
        CourseRating courseRating = CourseRating.builder()
                .courseId(courseCompletedPercent.getCourseId())
                .employeeId(courseCompletedPercent.getEmployeeId())
                .learningPathId(courseCompletedPercent.getLearningPathId())
                .percentCompleted(courseCompletedPercent.getPercentCompleted())
                .build();

        if (courseRatingRepository.save(courseRating) != null) {
            message.put("message", "Course Rating Succesfully Added");
        }
        return message;
    }

    @Override
    public Map<String, String> updateCourseRating(long courseRatingId, CourseCompletedPercentRequest courseCompletedPercent) {
        Map<String, String> message = new HashMap<>();
        CourseRating courseRating = CourseRating.builder()
                .id(courseRatingId)
                .courseId(courseCompletedPercent.getCourseId())
                .employeeId(courseCompletedPercent.getEmployeeId())
                .learningPathId(courseCompletedPercent.getLearningPathId())
                .percentCompleted(courseCompletedPercent.getPercentCompleted())
                .build();

        if (courseRatingRepository.save(courseRating) != null) {
            message.put("message", "Course Rating Succesfully Updated");
        }
        return message;
    }

    @Override
    public int courseCompletionAverage(long employeeId, long learningPathId) {

          System.out.println(employeeId+" "+learningPathId);
        List<CourseRating> courseRating = courseRatingRepository.getRatingByCourseIdAndLEarningPath(learningPathId, employeeId);

        if (courseRating.size() < 1)
            return 0;

        int count = courseRating.stream()
                .mapToInt(x -> x.getPercentCompleted())
                .sum();
        return (count * 100) / (courseRating.size() * 100);

    }


}
