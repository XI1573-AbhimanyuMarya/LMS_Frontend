package com.xebia.learningmanagement.service.impl;

import com.xebia.learningmanagement.dtos.DurationDto;
import com.xebia.learningmanagement.dtos.EmployeeLearningPathStatisticsDto;
import com.xebia.learningmanagement.dtos.LearningPathEmployeeDto;
import com.xebia.learningmanagement.dtos.request.CourseCompletedPercentRequest;
import com.xebia.learningmanagement.dtos.request.EmployeeEmailRequest;
import com.xebia.learningmanagement.entity.*;
import com.xebia.learningmanagement.enums.EmailType;
import com.xebia.learningmanagement.exception.LearningPathException;
import com.xebia.learningmanagement.exception.UsernameNotFoundException;
import com.xebia.learningmanagement.repository.CourseRatingRepository;
import com.xebia.learningmanagement.repository.LearningPathEmployeesRepository;
import com.xebia.learningmanagement.repository.LearningPathRepository;
import com.xebia.learningmanagement.repository.UserRepository;
import com.xebia.learningmanagement.service.EmployeeLearningPathService;
import com.xebia.learningmanagement.util.EmailSend;
import com.xebia.learningmanagement.util.ErrorBank;
import com.xebia.learningmanagement.util.MessageBank;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

import static com.xebia.learningmanagement.enums.LearningPathApprovalStatus.PENDING;
import static com.xebia.learningmanagement.enums.LearningPathApprovalStatus.YTBD;

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
    private LearningPathRepository learningPathRepository;


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


    @Override
    public List<EmployeeLearningPathStatisticsDto> getLearningPathsAssignedToMe(EmployeeEmailRequest employeeEmail) throws LearningPathException {
        ModelMapper modelMapper = new ModelMapper();
        String endDate;
        User user = userRepository.findByUsername(employeeEmail.getEmployeeEmail()).orElseThrow(() -> new UsernameNotFoundException("UserEmail does not exist"));
        List<LearningPathEmployees> learningPathEmployees = learningPathEmployeesRepository.findByEmployee(user);
        List<EmployeeLearningPathStatisticsDto> employeeLearningPathStatisticsDtoList = new ArrayList<>();
        for (LearningPathEmployees learningPath : learningPathEmployees) {
            if (learningPath.getEndDate().compareTo(LocalDate.now()) == 1) {
                endDate = learningPath.getEndDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));
            } else {
                //TODO Days remaining for expiration yet to be implemented
                endDate = "Expired";
            }
            int percentCompleted = courseCompletionAverage(learningPath.getEmployee().getId(), learningPath.getLearningPath().getId());
            EmployeeLearningPathStatisticsDto employeeLearningPathStatisticsDto = EmployeeLearningPathStatisticsDto.builder()
                    .learningPathEmployeesId(learningPath.getLearningPathEmployeesId())
                    .duration(modelMapper.map(learningPath.getDuration(), DurationDto.class))
                    .learningPath(modelMapper.map(learningPath.getLearningPath(), LearningPathEmployeeDto.class))
                    .endDate(endDate)
                    .startDate(learningPath.getStartDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")))
                    .percentCompleted(percentCompleted)
                    .build();

            employeeLearningPathStatisticsDtoList.add(employeeLearningPathStatisticsDto);
        }


        return employeeLearningPathStatisticsDtoList;
    }


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


    public Map<String, String> saveOrUpdateCourseRating(CourseCompletedPercentRequest courseCompletedPercent) throws Exception {
        Map<String, String> message = new HashMap<>();
        CourseRating recordExists = courseRatingRepository.findByLearningPathIdAndCourseIdAndEmployeeId(courseCompletedPercent.getLearningPathId(), courseCompletedPercent.getCourseId(), courseCompletedPercent.getEmployeeId());
        CourseRating courseRating = new CourseRating();
        if (Objects.isNull(recordExists)) {
            courseRating = CourseRating.builder()
                    .courseId(courseCompletedPercent.getCourseId())
                    .employeeId(courseCompletedPercent.getEmployeeId())
                    .learningPathId(courseCompletedPercent.getLearningPathId())
                    .percentCompleted(courseCompletedPercent.getPercentCompleted())
                    .build();
        } else {
            courseRating = recordExists;
            courseRating.setPercentCompleted(courseCompletedPercent.getPercentCompleted());
        }
        courseRatingRepository.save(courseRating);
        try {
            updateStatusAndLearningRate(courseRating.getEmployeeId(), courseRating.getLearningPathId());
        } catch (Exception e) {
            throw new Exception("Error updating Employee Update Status And Learning Rate. Reason: "+e.getMessage());
        }
        message.put("message", "Course Rating Succesfully Updated");
        return message;
    }


    public int courseCompletionAverage(long employeeId, long learningPathId) {

        List<CourseRating> courseRating = courseRatingRepository.getRatingByLearningPathAndEmployeeId(learningPathId, employeeId);
        LearningPath learningPath = learningPathRepository.findById(learningPathId).orElseThrow(() -> new LearningPathException("Learning Path ID not found: " + learningPathId));
        int coursesCount = learningPath.getCourses().size();
        if (courseRating.size() < 1)
            return 0;
        int count = courseRating.stream()
                .mapToInt(CourseRating::getPercentCompleted)
                .sum();
        return (count) / (coursesCount);
    }

    private void updateStatusAndLearningRate(long employeeId, long learningPathId) throws Exception {
        log.info("Setting course rating for employee with ID " + employeeId + " & Learning Path with ID" + learningPathId);

        int percentCompletedCalculation = courseCompletionAverage(employeeId, learningPathId);
        LearningPathEmployees learningPath = learningPathEmployeesRepository.findByLearningPathIdAndEmployeeId(learningPathId, employeeId);

        if (percentCompletedCalculation == 100 && learningPath.getApprovalStatus().equals(YTBD)) {
            learningPath.setApprovalStatus(PENDING);
            learningPath.setPercentCompleted(percentCompletedCalculation);
            learningPathEmployeesRepository.saveAndFlush(learningPath);
            setReviewApprovalMailPropertiesAndSendEmail(learningPath);

        } else if (percentCompletedCalculation != 100 && learningPath.getApprovalStatus().equals(YTBD)) {
            learningPath.setPercentCompleted(percentCompletedCalculation);
            learningPathEmployeesRepository.saveAndFlush(learningPath);
        }

    }


    private void setReviewApprovalMailPropertiesAndSendEmail(LearningPathEmployees learningPathEmployees) throws Exception {

        Map<String, String> model = new HashMap<>();

        model.put("learningPathName", learningPathEmployees.getLearningPath().getName());
        model.put("Email", learningPathEmployees.getLearningPath().getMadeBy().getUsername());
        model.put("employeeName", learningPathEmployees.getEmployee().getFullName());
        model.put("emailFor", learningPathEmployees.getLearningPath().getMadeBy().getFullName());
        emailSend.sendEmailMethodUsingTemplate(EmailType.REVIEW_LEARNING_PATH_APPROVAL_REJECTION_MANAGER.getValue(), model);
    }


}
