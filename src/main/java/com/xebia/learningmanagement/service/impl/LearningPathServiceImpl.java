package com.xebia.learningmanagement.service.impl;

import com.google.common.base.CharMatcher;
import com.xebia.learningmanagement.dtos.*;
import com.xebia.learningmanagement.dtos.LearningPathDto.Path;
import com.xebia.learningmanagement.dtos.request.AssignLearningPathRequest;
import com.xebia.learningmanagement.dtos.request.LearningPathReviewRequest;
import com.xebia.learningmanagement.dtos.request.ManagerEmailRequest;
import com.xebia.learningmanagement.entity.*;
import com.xebia.learningmanagement.enums.EmailType;
import com.xebia.learningmanagement.enums.LearningPathApprovalStatus;
import com.xebia.learningmanagement.exception.LearningPathEmployeesException;
import com.xebia.learningmanagement.exception.LearningPathException;
import com.xebia.learningmanagement.exception.UserNotFoundException;
import com.xebia.learningmanagement.exception.UsernameNotFoundException;
import com.xebia.learningmanagement.repository.*;
import com.xebia.learningmanagement.service.LearningPathService;
import com.xebia.learningmanagement.util.EmailSend;
import com.xebia.learningmanagement.util.MessageBank;
import com.xebia.learningmanagement.util.UpdateUserNotification;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.text.DateFormatSymbols;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Month;
import java.util.*;
import java.util.stream.Collectors;

import static com.xebia.learningmanagement.enums.LearningPathApprovalStatus.*;
import static com.xebia.learningmanagement.enums.NotificationDescription.LP_CERTIFICATE_APPROVED;
import static com.xebia.learningmanagement.enums.NotificationDescription.LP_CERTIFICATE_REJECTED;
import static com.xebia.learningmanagement.enums.NotificationHeader.Certificate_Approved;
import static com.xebia.learningmanagement.enums.NotificationHeader.Certificate_Rejected;
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

    @Autowired
    private CourseRatingRepository courseRatingRepository;

    @Autowired
    private CertificateRepository certificateRepository;

    @Autowired
    protected UpdateUserNotification updateUserNotification;


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
        learningPath.setMadeBy(userRepository.findById(path.getMadeById()).get());
        learningPath.setName(path.getName());
        learningPath.setCourses(courseRepository.findAllById(path.getCoursesId()));
        learningPath.setDescription(path.getDescription());
        Competency competencyLevel = competencyRepository.findById(path.getCompetencyLevelId()).orElseThrow(() -> new LearningPathException("Competency Level Id Not found"));
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
            learningPathEmployees.setMonthlyProgressModifiedDate(LocalDateTime.now());
            learningPathEmployees.setDuration(durationRepository.findById(path.getDuration()).get());
            learningPathEmployees.setStartDate(LocalDate.now());
            Integer lpDuration = Integer.valueOf(CharMatcher.inRange('0', '9').retainFrom(learningPathEmployees.getDuration().getName()));
            learningPathEmployees.setEndDate(LocalDate.now().plusMonths(lpDuration));
            learningPathEmployees.setApprovalStatus(YTBD);


            //TODO : Send Email to concerned User
            User madeByUser = userRepository.findById(path.getMadeById()).orElseThrow(NotFoundException::new);
            String madeByUserFullName = madeByUser.getFullName().concat(" : " + madeByUser.getEmpID());

            List<Courses> coursesListById = courseRepository.findAllById(path.getCoursesId());
            List<String> stringList = coursesListById.stream().map(Courses::getName).map(String::toUpperCase).collect(Collectors.toList());

            LocalDate startDate = learningPathEmployees.getStartDate();
            LocalDate endDate = learningPathEmployees.getEndDate();

            // todo Set Email Properties
            try {
                updateUserNotification.learningPathAssignedNotifications(learningPath, user);
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


    @Override
    public Map<Long, List<LearningPathManagerDto>> manageAssignedLearningPaths(ManagerEmailRequest managerEmail) throws LearningPathException {
        ModelMapper modelMapper = new ModelMapper();
        User user = userRepository.findByUsername(managerEmail.getManagerEmail()).orElseThrow(() -> new UsernameNotFoundException(MessageBank.USERNAME_NOT_FOUND));
        List<LearningPathEmployees> learningPathList = learningPathEmployeesRepository.findByLearningPathMadeBy(user);
        List<LearningPathManagerDto> learningPathManagerDtos = learningPathList.stream().map(a -> modelMapper.map(a, LearningPathManagerDto.class)).collect(Collectors.toList());
        return learningPathManagerDtos.stream().collect(Collectors.groupingBy(a -> a.getEmployee().getId()));
    }

    @Override
    public List<LearningPathCourseDetailsDTO> getCourseDetails(Long learningPathId, Long employeeId, Long learningPathEmployeesId) {
        ModelMapper modelMapper = new ModelMapper();
        List<LearningPathCourseDetailsDTO> courseDetailsList = new ArrayList<>();
        List<Certificate> documentsAlreadyUploaded;
        boolean uploadedBool = false;

        LearningPath learningPath = learningPathRepository.findById(learningPathId).orElseThrow(() -> new LearningPathException(MessageBank.LEARNING_PATH_ID_NOT_FOUND));
        LearningPathApprovalStatus learningPathStatusForAnEmployee = learningPathEmployeesRepository.findStatusByLearningPathIdAndEmployeeId(learningPathId, employeeId);

        for (Courses singleCourse : learningPath.getCourses()) {
            if (learningPathEmployeesId != null && !learningPathStatusForAnEmployee.equals(REJECTED)) {
                documentsAlreadyUploaded = certificateRepository.findByLearningPathEmployeeIdAndEmployeeIdAndCourseId(learningPathEmployeesId, employeeId, singleCourse.getId());
                uploadedBool = !documentsAlreadyUploaded.isEmpty();
            }
            LearningPathCourseDetailsDTO singleCourseDetails = LearningPathCourseDetailsDTO.builder()
                    .id(singleCourse.getId())
                    .name(singleCourse.getName())
                    .description(singleCourse.getDescription())
                    .category(modelMapper.map(singleCourse.getCategory(), CategoryDto.class))
                    .competency(singleCourse.getCompetency())
                    .documentsUploaded(uploadedBool)
                    .percentCompleted(evaluateCourseCompletionPercentage(learningPath, employeeId, singleCourse.getId())).build();

            courseDetailsList.add(singleCourseDetails);
        }

        return courseDetailsList;
    }

    private int evaluateCourseCompletionPercentage(LearningPath learningPath, Long employeeId, Long courseId) {
        CourseRating courseRatingForEmployee = courseRatingRepository.findByLearningPathIdAndCourseIdAndEmployeeId(learningPath.getId(), courseId, employeeId);
        if (Objects.nonNull(courseRatingForEmployee)) {
            return courseRatingForEmployee.getPercentCompleted();
        } else {
            return 0;
        }

    }


    @Override
    public List<ApprovalDto> getPendingApprovals(ManagerEmailRequest managerEmail) {
        User user = userRepository.findByUsername(managerEmail.getManagerEmail()).orElseThrow(() -> new UsernameNotFoundException("UserEmail does not exist"));
        List<LearningPathEmployees> madeByManager = learningPathEmployeesRepository.findByLearningPathMadeBy(user);
        // TODO : Pending approvals must be sorted by some date  : make abstract auditing entity
        List<LearningPathEmployees> needsApprovalEmpList = madeByManager.stream().filter(a -> PENDING.equals(a.getApprovalStatus())).collect(Collectors.toList());
        return needsApprovalEmpList.stream().map(this::pendingApprovalsListToApprovalDto).collect(Collectors.toList());
    }

    public ApprovalDto pendingApprovalsListToApprovalDto(LearningPathEmployees employee) {
        ApprovalDto approvalDto = new ApprovalDto();
        ModelMapper modelMapper = new ModelMapper();

        approvalDto.setApprovalStatus(employee.getApprovalStatus());
        approvalDto.setLearningPathEmployeesId(employee.getLearningPathEmployeesId());
        approvalDto.setPercentCompleted(employee.getPercentCompleted());
        approvalDto.setLearningPath(modelMapper.map(employee.getLearningPath(), LearningPathManagerApprovalDto.class));
        approvalDto.setEmployee(modelMapper.map(employee.getEmployee(), EmployeeDto.class));
        approvalDto.setStartDate(employee.getStartDate());
        approvalDto.setEndDate(employee.getEndDate());
        approvalDto.setDuration(modelMapper.map(employee.getDuration(), DurationDto.class));
        return approvalDto;

    }

    @Override
    public void approveRequests(LearningPathReviewRequest request) throws Exception {
        String reviewMessage;
        String notificationDescription = null;
        String notificationHeader = null;

        LearningPathEmployees learningPathEmployees = learningPathEmployeesRepository.findById(request.getLearningPathEmployeeId()).orElseThrow(() -> new LearningPathEmployeesException(MessageBank.LEARNING_PATH_EMPLOYEE_ID_NOT_FOUND));

        String managerName = learningPathEmployees.getLearningPath().getMadeBy().getFullName();
        String learningPathName = learningPathEmployees.getLearningPath().getName();

        if (request.getStatus().equalsIgnoreCase("APPROVED")) {
            learningPathEmployees.setApprovalStatus(APPROVED);
            reviewMessage = "APPROVED";
            notificationDescription = "Your " + learningPathName + " " + LP_CERTIFICATE_APPROVED.getDescription() + managerName;
            notificationHeader = Certificate_Approved.getValue();

        } else {
            learningPathEmployees.setApprovalStatus(REJECTED);
            reviewMessage = request.getReviewMessage();
            notificationDescription = "Your " + learningPathName + " " + LP_CERTIFICATE_REJECTED.getDescription() + managerName;
            notificationHeader = Certificate_Rejected.getValue();
        }

        try {
            setApprovalMailPropertiesAndSendEmail(learningPathEmployees, reviewMessage);
            updateUserNotification.learningPathReviewNotifications(learningPathEmployees, notificationDescription, notificationHeader);
            learningPathEmployeesRepository.saveAndFlush(learningPathEmployees);
        } catch (Exception e) {
            throw new LearningPathEmployeesException("Unable to Send Email & update Status");
        }


    }


    private void setApprovalMailPropertiesAndSendEmail(LearningPathEmployees learningPathEmployees, String reviewMessage) throws Exception {

        Map<String, String> model = new HashMap<>();

        model.put("learningPathName", learningPathEmployees.getLearningPath().getName());
        model.put("Email", learningPathEmployees.getEmployee().getUsername());
        model.put("status", learningPathEmployees.getApprovalStatus().toString());
        model.put("emailFor", learningPathEmployees.getEmployee().getFullName());
        model.put("reviewMessage", reviewMessage);
        emailSend.sendEmailMethodUsingTemplate(EmailType.LEARNING_PATH_APPROVAL_REJECTION.getValue(), model);
    }

    @Override
    public List<LearningPath> getLearningPathWithCourse(Long assigneeId) {
        return learningPathRepository.findByMadeById(assigneeId);
    }

    @Override
    public void saveAssignLearningPaths(@Valid AssignLearningPathRequest request) throws Exception {

        request.getLearningPathIds().forEach((learningPathId, duration) -> {

            LearningPath learningPath = learningPathRepository.findById(learningPathId)
                    .orElseThrow(() -> new LearningPathException("No such leaning path :  " + learningPathId));

            request.getEmployeeIds().forEach(employeeId -> {

                User user = userRepository.findById(employeeId)
                        .orElseThrow(() -> new UserNotFoundException("No such employee : " + employeeId));

                LearningPathEmployees learningPathEmployees;
                LearningPathEmployees recordAlreadyExists = learningPathEmployeesRepository.findByLearningPathIdAndEmployeeId(learningPath.getId(), user.getId());

                if (Objects.nonNull(recordAlreadyExists)) {
                    learningPathEmployees = recordAlreadyExists;
                    learningPathEmployees.setMonthlyProgressModifiedDate(LocalDateTime.now());
                    learningPathEmployees.setApprovalStatus(YTBD);
                    learningPathEmployees.setDuration(duration);
                    learningPathEmployees.setStartDate(LocalDate.now());
                    Integer lpDuration = Integer.valueOf(CharMatcher.inRange('0', '9').retainFrom(duration.getName()));
                    learningPathEmployees.setEndDate(LocalDate.now().plusMonths(lpDuration));

                    updateUserNotification.learningPathModifiedNotifications(learningPath, user);

                } else {
                    learningPathEmployees = new LearningPathEmployees();
                    learningPathEmployees.setLearningPath(learningPath);
                    learningPathEmployees.setEmployee(user);
                    learningPathEmployees.setPercentCompleted(0);
                    learningPathEmployees.setMonthlyProgressModifiedDate(LocalDateTime.now());
                    learningPathEmployees.setApprovalStatus(YTBD);
                    learningPathEmployees.setDuration(duration);
                    learningPathEmployees.setStartDate(LocalDate.now());
                    Integer lpDuration = Integer.valueOf(CharMatcher.inRange('0', '9').retainFrom(duration.getName()));
                    learningPathEmployees.setEndDate(LocalDate.now().plusMonths(lpDuration));

                    updateUserNotification.learningPathAssignedNotifications(learningPath, user);
                }
                try {

                    String madeByUserFullName = learningPath.getMadeBy().getFullName() + " : "
                            + learningPath.getMadeBy().getEmpID();
                    List<Courses> coursesList = learningPath.getCourses();
                    List<String> stringList = coursesList.stream().map(Courses::getName).map(String::toUpperCase)
                            .collect(Collectors.toList());
                    LearningPathDto learningDto = new LearningPathDto();
                    Path path = learningDto.new Path();
                    path.setName(learningPath.getName());
                    path.setDuration(duration.getId());

                    setMailPropertiesAndSendEmail(user, path, madeByUserFullName, stringList, learningPathEmployees.getStartDate(), learningPathEmployees.getEndDate());

                } catch (Exception e) {
                    throw new RuntimeException("Unable to send Email & Save data");
                }

                learningPathEmployeesRepository.save(learningPathEmployees);

            });

        });

    }

    @Override
    public AdminDashboardStatisticsDTO dashboardStatistics(ManagerEmailRequest managerEmail) {
        User user = userRepository.findByUsername(managerEmail.getManagerEmail()).orElseThrow(() -> new UsernameNotFoundException(MessageBank.USERNAME_NOT_FOUND));

        long totalLearningPathMadeBy = learningPathEmployeesRepository.countByLearningPathMadeBy(user);
        long totalLearningPathCompleted = learningPathEmployeesRepository.countByPercentCompletedAndApprovalStatusAndLearningPathMadeBy(100, APPROVED, user);
        long totalLearningPathInprogress = learningPathEmployeesRepository.countByPercentCompletedNotAndApprovalStatusNotAndLearningPathMadeBy(0, APPROVED, user);
        long totalLearningPathExpired = learningPathEmployeesRepository.countByEndDateBeforeAndLearningPathMadeBy(LocalDate.now(), user);
        return AdminDashboardStatisticsDTO.builder()
                .totalLearningPathAssigned(totalLearningPathMadeBy)
                .totalLearningPathCompleted((int) Math.round((double) totalLearningPathCompleted / totalLearningPathMadeBy * 100))
                .totalLearningPathInProgress((int) Math.round((double) totalLearningPathInprogress / totalLearningPathMadeBy * 100))
                .totalLearningPathExpired((int) Math.round((double) totalLearningPathExpired / totalLearningPathMadeBy * 100)).build();
    }

    @Override
    public List<LearningPath> dashboardTopTrending(Long assigneeId) {
        HashMap<LearningPath, Long> learningPathLongHashMap = new HashMap<>();
        List<LearningPath> learningPaths = learningPathRepository.findByMadeById(assigneeId);
        for (LearningPath learningPath : learningPaths) {
            Long aLong = learningPathEmployeesRepository.countByLearningPath(learningPath);
            learningPathLongHashMap.put(learningPath, aLong);
        }
        List<LearningPath> sortedList = sortByValue(learningPathLongHashMap);
        return sortedList.stream().limit(5).collect(Collectors.toList());
    }

    public static List<LearningPath> sortByValue(Map<LearningPath, Long> hm) {
        List<Map.Entry<LearningPath, Long>> list = new LinkedList<Map.Entry<LearningPath, Long>>(hm.entrySet());

        Collections.sort(list, new Comparator<Map.Entry<LearningPath, Long>>() {
            public int compare(Map.Entry<LearningPath, Long> o1,
                               Map.Entry<LearningPath, Long> o2) {
                return (o1.getValue()).compareTo(o2.getValue());
            }
        });

        // put data from sorted list to a new list
        List<LearningPath> returnList = new LinkedList<>();
        for (int i = list.size() - 1; i >= 0; i--) {
            returnList.add(list.get(i).getKey());
        }
        return returnList;
    }


    @Override
    public List<DashboardGraphStatisticsDTO> dashboardGraphStatistics(long uid) {
        LocalDateTime today = LocalDateTime.now();
        LocalDateTime comparisonDate = LocalDateTime.of((today.getYear() - 1), today.getMonth(), (today.getDayOfMonth() - 1), 1, 1, 1);
        DateFormatSymbols dfs = new DateFormatSymbols();
        List<String> monthsCollection = Arrays.stream(dfs.getMonths()).filter(a -> !a.equals("")).collect(Collectors.toList());

        User user = userRepository.findById(uid).orElseThrow(() -> new UserNotFoundException(MessageBank.USERNAME_NOT_FOUND));
        List<LearningPathEmployees> learningPathMadeByManager = learningPathEmployeesRepository.findByLearningPathMadeBy(user);
        int totalRecordCount = learningPathMadeByManager.size();
        Map<Month, Long> completedCount = learningPathMadeByManager.stream().filter(a -> a.getApprovalStatus().equals(APPROVED)).collect(Collectors.groupingBy(z -> z.getMonthlyProgressModifiedDate().getMonth(), Collectors.counting()));
        Map<Month, Long> inprogressCount = learningPathMadeByManager.stream().filter(a -> !a.getApprovalStatus().equals(APPROVED)).collect(Collectors.groupingBy(z -> z.getMonthlyProgressModifiedDate().getMonth(), Collectors.counting()));
        Map<Month, Long> overdueCount = learningPathMadeByManager.stream().filter(a -> a.getEndDate().compareTo(LocalDate.now()) < 0).filter(a -> a.getApprovalStatus().equals(YTBD)).collect(Collectors.groupingBy(a -> a.getMonthlyProgressModifiedDate().getMonth(), Collectors.counting()));
        // TODO YET TO BE DECIDED
        return null;
    }
}
