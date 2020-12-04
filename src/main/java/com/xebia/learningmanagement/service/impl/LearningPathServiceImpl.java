package com.xebia.learningmanagement.service.impl;

import com.google.common.base.CharMatcher;
import com.xebia.learningmanagement.dtos.*;
import com.xebia.learningmanagement.dtos.LearningPathDto.Path;
import com.xebia.learningmanagement.dtos.request.AssignLearningPathRequest;
import com.xebia.learningmanagement.dtos.request.LearningPathEmployeeApprovalRequest;
import com.xebia.learningmanagement.dtos.request.ManagerEmailRequest;
import com.xebia.learningmanagement.entity.*;
import com.xebia.learningmanagement.enums.EmailType;
import com.xebia.learningmanagement.exception.*;
import com.xebia.learningmanagement.repository.*;
import com.xebia.learningmanagement.service.LearningPathService;
import com.xebia.learningmanagement.util.EmailSend;
import org.apache.tomcat.util.codec.binary.Base64;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

import static com.xebia.learningmanagement.enums.LearningPathApprovalStatus.*;
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
    protected CompetencyRepository competencyRepository;

    @Autowired
    protected LearningPathEmployeesRepository learningPathEmployeesRepository;

    @Autowired
    protected EmailSend emailSend;


    @Override
    public void createLearningPath(LearningPathDto.Path path) throws Exception {
        LearningPath learningPath = new LearningPath();
        LearningPathEmployees learningPathEmployees = new LearningPathEmployees();

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
        learningPath.setMadeBy(userRepository.findById(path.getMadeById()).get());
        learningPath.setName(path.getName());
        learningPath.setCourses(courseRepository.findAllById(path.getCoursesId()));
        learningPath.setDescription(path.getDescription());
        Competency competencyLevel = competencyRepository.findById(path.getCompetencyLevelId()).orElseThrow(() -> new CompetencyLevelException("Competency Level Id Not found"));
//        Competency competencyLevel1 = competencyRepository.findById((long) 102).orElseThrow(() -> new CompetencyLevelException("Competency Level Id Not found"));


        learningPath.setCompetency(competencyLevel);

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
            learningPathEmployees.setDuration(durationRepository.findById(path.getDuration()).get());
            learningPathEmployees.setStartDate(LocalDate.now());
            Integer lpDuration = Integer.valueOf(CharMatcher.inRange('0', '9').retainFrom(learningPathEmployees.getDuration().getName()));
            learningPathEmployees.setEndDate(LocalDate.now().plusMonths(lpDuration));


            //TODO : Send Email to concerned User
            User madeByUser = userRepository.findById(path.getMadeById()).orElseThrow(() -> new NotFoundException());
            String madeByUserFullName = madeByUser.getFullName().concat(" : " + madeByUser.getEmpID());

            //List of courses made for Employee
            List<Courses> coursesListById = courseRepository.findAllById(path.getCoursesId());
            List<String> stringList = coursesListById.stream().map(Courses::getName).map(String::toUpperCase).collect(Collectors.toList());

            LocalDate startDate = learningPathEmployees.getStartDate();
            LocalDate endDate = learningPathEmployees.getEndDate();

            //todo Set Email Properties
            try {
                setMailPropertiesAndSendEmail(user, path, madeByUserFullName, stringList, startDate, endDate);

            } catch (Exception e) {
                throw new Exception("Unable to send Email & Save data");
            }
            //Save Learning path for Employee after the Email Mail has been sent
            learningPathEmployeesRepository.save(learningPathEmployees);

        }

    }


    private void setMailPropertiesAndSendEmail(User user,
                                               LearningPathDto.Path path,
                                               String madeByUserFullName,
                                               List<String> stringList,
                                               LocalDate startDate,
                                               LocalDate endDate) throws Exception {

        Map<String, String> model = new HashMap<>();
        String appendedCourses = stringList.stream().collect(Collectors.joining(", \n"));
        model.put("learningPathName", path.getName());
        model.put("Email", user.getUsername());
        model.put("madeFor", user.getFullName());
        model.put("madeBy", madeByUserFullName);
        model.put("timeline", String.valueOf(path.getDuration()));
        model.put("assignedCourse", appendedCourses);
        model.put("startDate", startDate.toString());
        model.put("endDate", endDate.toString());

        emailSend.sendEmailMethodUsingTemplate(EmailType.LEARNING_PATH_ASSIGN.getValue(), model);
    }

    /***
     *
     * @param managerEmail
     * @return
     * @throws LearningPathException
     */
    @Override
    public Map<EmployeeDto, List<LearningPathManagerDto>> getAllAssignedLearningPath(ManagerEmailRequest managerEmail) throws LearningPathException {
        ModelMapper modelMapper = new ModelMapper();
        User user = userRepository.findByUsername(managerEmail.getManagerEmail()).orElseThrow(() -> new UsernameNotFoundException("UserEmail does not exist"));
        List<LearningPathEmployees> learningPathList = learningPathEmployeesRepository.findByLearningPathMadeBy(user);
        List<LearningPathManagerDto> learningPathManagerDtos = learningPathList.stream().map(a -> modelMapper.map(a, LearningPathManagerDto.class)).collect(Collectors.toList());
        Map<EmployeeDto, List<LearningPathManagerDto>> employeeLearningPathMapping = learningPathManagerDtos.stream().collect(Collectors.groupingBy(LearningPathManagerDto::getEmployee));
        return employeeLearningPathMapping;

    }

    @Override
    public List<ApprovalDto> getPendingApprovals(ManagerEmailRequest managerEmail) {
        ModelMapper modelMapper = new ModelMapper();
        User user = userRepository.findByUsername(managerEmail.getManagerEmail()).orElseThrow(() -> new UsernameNotFoundException("UserEmail does not exist"));
        List<LearningPathEmployees> madeByManager = learningPathEmployeesRepository.findByLearningPathMadeBy(user);
        List<LearningPathEmployees> needsApprovalEmpList = madeByManager.stream().filter(a -> PENDING.equals(a.getApprovalStatus())).sorted(Comparator.comparing(LearningPathEmployees::getModifiedDate)).collect(Collectors.toList());
        List<ApprovalDto> approvalDtos = needsApprovalEmpList.stream().map(this::PendingApprovalsListToApprovalDto).collect(Collectors.toList());
        return approvalDtos;
    }

    public ApprovalDto PendingApprovalsListToApprovalDto(LearningPathEmployees employee) {
        ApprovalDto approvalDto = new ApprovalDto();
        ModelMapper modelMapper = new ModelMapper();

        String bytes = Objects.nonNull(employee.getCertificate()) ? new String(Base64.encodeBase64(employee.getCertificate()), StandardCharsets.UTF_8) : null;
        approvalDto.setCertificate(bytes);
        approvalDto.setApprovalStatus(employee.getApprovalStatus());
        approvalDto.setLearningPathEmployeesId(employee.getLearningPathEmployeesId());
        approvalDto.setPercentCompleted(employee.getPercentCompleted());
        approvalDto.setModifiedDate(employee.getModifiedDate());
        approvalDto.setLearningPath(modelMapper.map(employee.getLearningPath(), LearningPathManagerApprovalDto.class));
        approvalDto.setEmployee(modelMapper.map(employee.getEmployee(), EmployeeDto.class));
        approvalDto.setStartDate(employee.getStartDate());
        approvalDto.setEndDate(employee.getEndDate());
        approvalDto.setIsLearningPathExpired(employee.getIsLearningPathExpired());
        approvalDto.setDuration(modelMapper.map(employee.getDuration(), DurationDto.class));
        return approvalDto;

    }

    @Override
    public void approveRequests(LearningPathEmployeeApprovalRequest request) throws Exception {
        LearningPathEmployees learningPathEmployees = learningPathEmployeesRepository.findById(request.getLearningPathEmployeeId()).orElseThrow(() -> new LearningPathEmployeesException("Learning Path Employee Id not found"));

        if (request.getStatus().equalsIgnoreCase("APPROVED")) {
            learningPathEmployees.setApprovalStatus(APPROVED);
        } else {
            learningPathEmployees.setApprovalStatus(REJECTED);
        }

        try {
            setApprovalMailPropertiesAndSendEmail(learningPathEmployees);
            learningPathEmployeesRepository.saveAndFlush(learningPathEmployees);
        } catch (Exception e) {
            throw new LearningPathEmployeesException("Unable to Send Email & update Status");
        }


    }


    private void setApprovalMailPropertiesAndSendEmail(LearningPathEmployees learningPathEmployees) throws Exception {

        Map<String, String> model = new HashMap<>();

        model.put("learningPathName", learningPathEmployees.getLearningPath().getName());
        model.put("Email", learningPathEmployees.getEmployee().getUsername());
        model.put("status", learningPathEmployees.getApprovalStatus().toString());
        model.put("emailFor", learningPathEmployees.getEmployee().getFullName());
        emailSend.sendEmailMethodUsingTemplate(EmailType.LEARNING_PATH_APPROVAL_REJECTION.getValue(), model);
    }

    @Override
    public List<LearningPath> getLearningPathWithCourse(Long assigneeId) {

        List<LearningPath> learningPathCourseList = learningPathRepository.findByMadeById(assigneeId);

        return learningPathCourseList;
    }

    @Override
    public void saveAssignLearningPaths(@Valid AssignLearningPathRequest request) throws Exception {

        request.getLearningPathIds().forEach(learningPathId -> {

            LearningPath learningPath = learningPathRepository.findById(learningPathId)
                    .orElseThrow(() -> new LearningPathException("No such leaning path :  " + learningPathId));

            request.getEmployeeIds().forEach(employeeId -> {

                User user = userRepository.findById(employeeId)
                        .orElseThrow(() -> new UserNotFoundException("No such employee : " + employeeId));

                LearningPathEmployees learningPathEmployees = new LearningPathEmployees();

                learningPathEmployees.setLearningPath(learningPath);
                learningPathEmployees.setEmployee(user);
                learningPathEmployees.setPercentCompleted(0);
                learningPathEmployees.setDuration(request.getDuration());
                learningPathEmployees.setStartDate(LocalDate.now());
                Integer lpDuration = Integer
                        .valueOf(CharMatcher.inRange('0', '9').retainFrom(request.getDuration().getName()));
                learningPathEmployees.setEndDate(LocalDate.now().plusMonths(lpDuration));

                try {

                    String madeByUserFullName = learningPath.getMadeBy().getFullName() + " : "
                            + learningPath.getMadeBy().getEmpID();
                    List<Courses> coursesList = learningPath.getCourses();
                    List<String> stringList = coursesList.stream().map(Courses::getName).map(String::toUpperCase)
                            .collect(Collectors.toList());
                    LearningPathDto learningDto = new LearningPathDto();// new LearningPathDto.Path();
                    Path path = learningDto.new Path();
                    path.setName(learningPath.getName());
                    path.setDuration(request.getDuration().getId());

                    // Sent Email Mail
                    setMailPropertiesAndSendEmail(user, path, madeByUserFullName, stringList,
                            learningPathEmployees.getStartDate(), learningPathEmployees.getEndDate());

                } catch (Exception e) {
                    throw new RuntimeException("Unable to send Email & Save data");
                }

                // Save Learning path for Employee
                learningPathEmployeesRepository.save(learningPathEmployees);

            });

        });

    }


}
