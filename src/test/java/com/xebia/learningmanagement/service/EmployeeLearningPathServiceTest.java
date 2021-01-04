package com.xebia.learningmanagement.service;

import com.xebia.learningmanagement.dtos.request.CourseCompletedPercentRequest;
import com.xebia.learningmanagement.dtos.request.EmployeeEmailRequest;
import com.xebia.learningmanagement.entity.*;
import com.xebia.learningmanagement.enums.LearningPathApprovalStatus;
import com.xebia.learningmanagement.exception.LearningPathException;
import com.xebia.learningmanagement.repository.CourseRatingRepository;
import com.xebia.learningmanagement.repository.LearningPathEmployeesRepository;
import com.xebia.learningmanagement.repository.LearningPathRepository;
import com.xebia.learningmanagement.repository.UserRepository;
import com.xebia.learningmanagement.service.impl.EmployeeLearningPathServiceImpl;
import com.xebia.learningmanagement.util.EmailSend;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
class EmployeeLearningPathServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private LearningPathEmployeesRepository learningPathEmployeesRepository;

    @Mock
    private EmailSend emailSend;

    @Mock
    private CourseRatingRepository courseRatingRepository;

    @Mock
    private LearningPathRepository learningPathRepository;

    @InjectMocks
    private EmployeeLearningPathServiceImpl employeeLearningPathServiceImpl;

    @DisplayName("Delete Learning Path Name")
    @Test
    void getLearningPathsAssignedToMeTest() {
        EmployeeEmailRequest employeeEmailRequest = Mockito.spy(EmployeeEmailRequest.class);
        employeeEmailRequest.setEmployeeEmail("DummyEmail");
        User user = Mockito.spy(User.class);
        user.setId(1L);

        Courses cources = Mockito.spy(Courses.class);

        List<Courses> courseList = new ArrayList<>();
        courseList.add(cources);
        LearningPath learningPath = Mockito.spy(LearningPath.class);
        learningPath.setId(1L);
        learningPath.setCourses(courseList);

        LearningPathEmployees learningPathEmployees = Mockito.spy(LearningPathEmployees.class);
        learningPathEmployees.setEndDate(LocalDate.now());
        learningPathEmployees.setLearningPath(learningPath);
        learningPathEmployees.setPercentCompleted(10);
        learningPathEmployees.setDuration(new Duration());
        learningPathEmployees.setStartDate(LocalDate.now());

        learningPathEmployees.setEmployee(user);
        List<LearningPathEmployees> learningPathEmployeesList = new ArrayList<>();
        learningPathEmployeesList.add(learningPathEmployees);


        Mockito.when(userRepository.findByUsername(Mockito.anyString())).thenReturn(Optional.of(user));
        Mockito.when(learningPathEmployeesRepository.findByEmployee(user)).thenReturn(learningPathEmployeesList);
        EmployeeLearningPathServiceImpl employeeLearningPathServiceMock = Mockito.mock(EmployeeLearningPathServiceImpl.class);

        CourseRating courseRating = Mockito.spy(CourseRating.class);
        courseRating.setPercentCompleted(50);

        List<CourseRating> courseRatingList = new ArrayList<>();
        courseRatingList.add(courseRating);

        Mockito.when(courseRatingRepository.getRatingByLearningPathAndEmployeeId(Mockito.anyLong(), Mockito.anyLong())).thenReturn(courseRatingList);
        Mockito.when(learningPathRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(learningPath));
        int size = employeeLearningPathServiceImpl.getLearningPathsAssignedToMe(employeeEmailRequest).size();

        assertEquals(1, size);
    }

    @DisplayName("Set Mail Properties")
    @Test
    public void setMailPropertiesTest() {
        Courses course = Mockito.spy(Courses.class);
        course.setDescription("dummy Description");
        List<Courses> coursesList = new ArrayList<>();
        coursesList.add(course);
        LearningPath learningPath = Mockito.spy(LearningPath.class);
        learningPath.setCourses(coursesList);
        LearningPathEmployees learningPathEmployees = Mockito.spy(LearningPathEmployees.class);
        learningPathEmployees.setEmployee(Mockito.mock(User.class));

        learningPathEmployees.setLearningPath(learningPath);
        int size = employeeLearningPathServiceImpl.setMailProperties(learningPathEmployees).size();

        assertEquals(4, size);

    }

    @DisplayName("Save or update course Rating")
    @Test
    public void saveOrUpdateCourseRating() throws Exception {
        CourseCompletedPercentRequest courseCompletedPercentRequest = Mockito.spy(CourseCompletedPercentRequest.class);

        Courses cources = Mockito.spy(Courses.class);
        List<Courses> courseList = new ArrayList<>();
        courseList.add(cources);
        LearningPath learningPath = Mockito.spy(LearningPath.class);
        learningPath.setId(1L);
        learningPath.setCourses(courseList);
        learningPath.setMadeBy(Mockito.mock(User.class));

        CourseRating courseRating = Mockito.spy(CourseRating.class);
        courseRating.setPercentCompleted(100);

        List<CourseRating> courseRatingList = new ArrayList<>();
        courseRatingList.add(courseRating);

        LearningPathEmployees learningPathEmployees = Mockito.spy(LearningPathEmployees.class);
        learningPathEmployees.setApprovalStatus(LearningPathApprovalStatus.YTBD);
        learningPathEmployees.setLearningPath(learningPath);
        learningPathEmployees.setEmployee(Mockito.mock(User.class));


        Mockito.when(courseRatingRepository.getRatingByLearningPathAndEmployeeId(Mockito.anyLong(), Mockito.anyLong())).thenReturn(courseRatingList);
        Mockito.when(learningPathRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(learningPath));

        Mockito.when(learningPathEmployeesRepository.findByLearningPathIdAndEmployeeId(Mockito.anyLong(), Mockito.anyLong())).thenReturn(learningPathEmployees);
        int size = employeeLearningPathServiceImpl.saveOrUpdateCourseRating(courseCompletedPercentRequest).size();
        assertEquals(1, size);
    }

    @Test
    public void deleteLearningPathLearningPathTest() throws Exception {

            Map data=Mockito.spy(HashMap.class);
            List<String> idList=new ArrayList<>();
            idList.add("1");
            data.put("ids",idList);
        Courses cources = Mockito.spy(Courses.class);
        cources.setDescription("dummy description");
        List<Courses> courseList = new ArrayList<>();
        courseList.add(cources);
        LearningPath learningPath = Mockito.spy(LearningPath.class);
        learningPath.setId(1L);
        learningPath.setCourses(courseList);
        learningPath.setMadeBy(Mockito.mock(User.class));
        LearningPathEmployees learningPathEmployees = Mockito.spy(LearningPathEmployees.class);
        learningPathEmployees.setApprovalStatus(LearningPathApprovalStatus.YTBD);
        learningPathEmployees.setLearningPath(learningPath);
        learningPathEmployees.setEmployee(Mockito.mock(User.class));

        Mockito.when(learningPathEmployeesRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(learningPathEmployees));
            employeeLearningPathServiceImpl.deleteLearningPath(data);


    }



    @DisplayName("Delete Learning Path Test PathException Test ")
    @Test
    public void deleteLearningPathLearningPathExceptionTest()
    {
       assertThrows(LearningPathException.class,()->{
           Map data=Mockito.spy(HashMap.class);
           List<String> idList=new ArrayList<>();
           idList.add("1");
           data.put("ids",idList);
           employeeLearningPathServiceImpl.deleteLearningPath(data);
       });

    }

    @DisplayName("Delete Learning Path Test Exception")
    @Test
    public void deleteLearningPathTestException()
    {
        assertThrows(Exception.class,()->{
            Map data=Mockito.mock(HashMap.class);

            employeeLearningPathServiceImpl.deleteLearningPath(null);
        });

    }




}
