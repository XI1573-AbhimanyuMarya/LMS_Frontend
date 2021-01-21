package com.xebia.learningmanagement.service.impl;

import com.xebia.learningmanagement.dtos.DashboardStatisticsDTO;
import com.xebia.learningmanagement.dtos.DurationDto;
import com.xebia.learningmanagement.dtos.EmployeeLearningPathStatisticsDto;
import com.xebia.learningmanagement.dtos.LearningPathEmployeeDto;
import com.xebia.learningmanagement.dtos.request.CourseCompletedPercentRequest;
import com.xebia.learningmanagement.dtos.request.EmployeeEmailRequest;
import com.xebia.learningmanagement.dtos.request.LearningPathApprovalRequest;
import com.xebia.learningmanagement.entity.*;
import com.xebia.learningmanagement.enums.EmailType;
import com.xebia.learningmanagement.exception.ErrorResponse;
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
import com.xebia.learningmanagement.util.UpdateUserNotification;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

import static com.xebia.learningmanagement.enums.LearningPathApprovalStatus.*;

@Service
@Slf4j
public class EmployeeLearningPathServiceImpl implements EmployeeLearningPathService {


    private final UserRepository userRepository;

    private final LearningPathEmployeesRepository learningPathEmployeesRepository;

    private final EmailSend emailSend;

    private final CourseRatingRepository courseRatingRepository;

    private final LearningPathRepository learningPathRepository;

    @Autowired
    protected UpdateUserNotification updateUserNotification;

    @Autowired
    public EmployeeLearningPathServiceImpl(UserRepository userRepository,
                                           LearningPathEmployeesRepository learningPathEmployeesRepository,
                                           EmailSend emailSend,
                                           CourseRatingRepository courseRatingRepository,
                                           LearningPathRepository learningPathRepository) {
        this.userRepository = userRepository;
        this.learningPathEmployeesRepository = learningPathEmployeesRepository;
        this.emailSend = emailSend;
        this.courseRatingRepository = courseRatingRepository;
        this.learningPathRepository = learningPathRepository;
    }


    @Override
    public void deleteLearningPath(Map data) throws ErrorResponse {
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
                        updateUserNotification.learningPathDeletedNotifications(learningpathemployees);
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
            throw new ErrorResponse(e.getMessage());
        }
    }


    @Override
    public List<EmployeeLearningPathStatisticsDto> getLearningPathsAssignedToMe(EmployeeEmailRequest employeeEmail) throws LearningPathException {
        ModelMapper modelMapper = new ModelMapper();
        String endDate;
        User user = userRepository.findByUsername(employeeEmail.getEmployeeEmail()).orElseThrow(() -> new UsernameNotFoundException(MessageBank.USERNAME_NOT_FOUND));
        List<LearningPathEmployees> learningPathEmployees = learningPathEmployeesRepository.findByEmployee(user);
        List<EmployeeLearningPathStatisticsDto> employeeLearningPathStatisticsDtoList = new ArrayList<>();
        for (LearningPathEmployees learningPath : learningPathEmployees) {
            if (learningPath.getEndDate().compareTo(LocalDate.now()) > 0) {
                endDate = learningPath.getEndDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));
            } else {
                //Days remaining for expiration yet to be implemented
                endDate = "Expired";
            }
            int percentCompleted = this.courseCompletionAverage(learningPath.getEmployee().getId(), learningPath.getLearningPath().getId());
            EmployeeLearningPathStatisticsDto employeeLearningPathStatisticsDto = EmployeeLearningPathStatisticsDto.builder()
                    .learningPathEmployeesId(learningPath.getLearningPathEmployeesId())
                    .duration(modelMapper.map(learningPath.getDuration(), DurationDto.class))
                    .learningPath(modelMapper.map(learningPath.getLearningPath(), LearningPathEmployeeDto.class))
                    .endDate(endDate)
                    .startDate(learningPath.getStartDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")))
                    .percentCompleted(percentCompleted)
                    .approvalStatus(learningPath.getApprovalStatus())
                    .build();

            employeeLearningPathStatisticsDtoList.add(employeeLearningPathStatisticsDto);
        }


        return employeeLearningPathStatisticsDtoList;
    }


    public Map<String, String> setMailProperties(LearningPathEmployees learningpathemployees) {
        Map<String, String> emailcontent = new HashMap<>();
        List<Courses> courselist = null;
        StringBuilder courses = new StringBuilder();
        try {
            courselist = learningpathemployees.getLearningPath().getCourses();
            if (courselist != null) {
                for (int i = 0; i < courselist.size(); i++) {
                    Courses course = courselist.get(i);
                    courses.append(course.getDescription());
                }
            }
            emailcontent.put("Email", learningpathemployees.getEmployee().getUsername());
            emailcontent.put("learningPathName", learningpathemployees.getLearningPath().getName());
            emailcontent.put("madeFor", learningpathemployees.getEmployee().getFullName());
            emailcontent.put("assignedCourse", courses.toString());
        } catch (Exception e) {
            log.info(e.getMessage());
        }
        return emailcontent;
    }


    public Map<String, String> saveOrUpdateCourseRating(CourseCompletedPercentRequest courseCompletedPercent) {
        Map<String, String> message = new HashMap<>();
        CourseRating recordExists = courseRatingRepository.findByLearningPathIdAndCourseIdAndEmployeeId(courseCompletedPercent.getLearningPathId(), courseCompletedPercent.getCourseId(), courseCompletedPercent.getEmployeeId());
        CourseRating courseRating = null;
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
        updateStatusAndLearningRate(courseRating.getEmployeeId(), courseRating.getLearningPathId());
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

    private void updateStatusAndLearningRate(long employeeId, long learningPathId) {
        log.info("Setting course rating for employee with ID " + employeeId + " & Learning Path with ID" + learningPathId);
        int percentCompletedCalculation = courseCompletionAverage(employeeId, learningPathId);
        LearningPathEmployees learningPathEmployees = learningPathEmployeesRepository.findByLearningPathIdAndEmployeeId(learningPathId, employeeId);
        learningPathEmployees.setPercentCompleted(percentCompletedCalculation);
        learningPathEmployees.setMonthlyProgressModifiedDate(LocalDateTime.now());
        learningPathEmployeesRepository.saveAndFlush(learningPathEmployees);

    }

    @Override
    public Map<String, String> sendForManagersApproval(LearningPathApprovalRequest approvalRequest) throws Exception {
        Map<String, String> message = new HashMap<>();
        int percentCompletedCalculation = courseCompletionAverage(approvalRequest.getEmployeeId(), approvalRequest.getLearningPathId());
        LearningPathEmployees learningPathEmployees = learningPathEmployeesRepository.findByLearningPathIdAndEmployeeId(approvalRequest.getLearningPathId(), approvalRequest.getEmployeeId());
        if (percentCompletedCalculation == 100 && (learningPathEmployees.getApprovalStatus().equals(YTBD) || learningPathEmployees.getApprovalStatus().equals(REJECTED))) {
            learningPathEmployees.setApprovalStatus(PENDING);
            learningPathEmployees.setPercentCompleted(percentCompletedCalculation);
            learningPathEmployees.setMonthlyProgressModifiedDate(LocalDateTime.now());
            log.info("Sending record for managers approval " + approvalRequest.getEmployeeId() + " & Learning Path with ID" + approvalRequest.getLearningPathId());
            learningPathEmployeesRepository.saveAndFlush(learningPathEmployees);
            updateUserNotification.managerApprovalRequiredNotifications(learningPathEmployees);
            setReviewApprovalMailPropertiesAndSendEmail(learningPathEmployees);
            message.put("Status", MessageBank.STATUS_SUCESS);
            message.put("message", " Record Sent For Approval");
        } else {

            message.put("Status", MessageBank.FAILURE);
            message.put("message", " Error Updating the Record");

        }
        return message;
    }

    private void setReviewApprovalMailPropertiesAndSendEmail(LearningPathEmployees learningPathEmployees) throws Exception {

        Map<String, String> model = new HashMap<>();

        model.put("learningPathName", learningPathEmployees.getLearningPath().getName());
        model.put("Email", learningPathEmployees.getLearningPath().getMadeBy().getUsername());
        model.put("employeeName", learningPathEmployees.getEmployee().getFullName());
        model.put("emailFor", learningPathEmployees.getLearningPath().getMadeBy().getFullName());
        emailSend.sendEmailMethodUsingTemplate(EmailType.REVIEW_LEARNING_PATH_APPROVAL_REJECTION_MANAGER.getValue(), model);
    }

    @Override
    public DashboardStatisticsDTO dashboardStatistics(EmployeeEmailRequest employeeEmail) {

        User user = userRepository.findByUsername(employeeEmail.getEmployeeEmail()).orElseThrow(() -> new UsernameNotFoundException(MessageBank.USERNAME_NOT_FOUND));

        long totalLearningPathAssigned = learningPathEmployeesRepository.countByEmployee(user);
        long totalLearningPathCompleted = learningPathEmployeesRepository.countByPercentCompletedAndApprovalStatusAndEmployee(100, APPROVED, user);
        long totalLearningPathInprogress = learningPathEmployeesRepository.countByApprovalStatusNotAndEndDateAfterAndEmployee(APPROVED,LocalDate.now(), user);
        long totalLearningPathExpired = learningPathEmployeesRepository.countByEndDateBeforeAndApprovalStatusInAndEmployee(LocalDate.now(), Arrays.asList(YTBD,REJECTED), user);

        return DashboardStatisticsDTO.builder()
                .totalLearningPathAssigned(totalLearningPathAssigned)
                .totalLearningPathCompleted(totalLearningPathCompleted)
                .totalLearningPathInProgress(totalLearningPathInprogress)
                .totalLearningPathExpired(totalLearningPathExpired).build();
    }
}
