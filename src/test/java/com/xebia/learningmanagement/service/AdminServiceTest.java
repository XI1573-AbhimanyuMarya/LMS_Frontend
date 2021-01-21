package com.xebia.learningmanagement.service;

import com.xebia.learningmanagement.dtos.AdminDashboardStatisticsDTO;
import com.xebia.learningmanagement.entity.Duration;
import com.xebia.learningmanagement.entity.LearningPath;
import com.xebia.learningmanagement.entity.LearningPathEmployees;
import com.xebia.learningmanagement.entity.User;
import com.xebia.learningmanagement.enums.LearningPathApprovalStatus;
import com.xebia.learningmanagement.repository.LearningPathEmployeesRepository;
import com.xebia.learningmanagement.repository.LearningPathRepository;
import com.xebia.learningmanagement.service.impl.AdminServiceImpl;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
class AdminServiceTest  {

    @Mock
    private LearningPathEmployeesRepository employeesRepository;

    @Mock
    private LearningPathRepository learningPathRepository;

    @InjectMocks
    private AdminServiceImpl adminServiceImpl;


    @DisplayName("DashBoard Details Test")
    @Test
     void dashboardDetails() {
        LearningPathEmployees learningPathEmployees = Mockito.spy(LearningPathEmployees.class);
        learningPathEmployees.setEmployee(new User());
        learningPathEmployees.setLearningPath(new LearningPath());
        learningPathEmployees.setApprovalStatus(LearningPathApprovalStatus.APPROVED);
        learningPathEmployees.setDuration(new Duration());
        learningPathEmployees.setStartDate(LocalDate.now());
        learningPathEmployees.setEndDate(LocalDate.now());
        List<LearningPathEmployees> learningPathEmployeesList = new ArrayList<>();
        learningPathEmployeesList.add(learningPathEmployees);

        Mockito.when(employeesRepository.findAll()).thenReturn(learningPathEmployeesList);
        int size = adminServiceImpl.dashboardDetails().size();
        assertEquals(1, size);
    }

//    @DisplayName("DashBoard Statistics")
//    @Test
//     void dashboardStatistics() {
//        Mockito.when(employeesRepository.count()).thenReturn(1L);
//        Mockito.when(employeesRepository.countByPercentCompleted(100)).thenReturn(1L);
//        Mockito.when(employeesRepository.countByPercentCompletedNot(100)).thenReturn(10L);
//        Mockito.when(employeesRepository.countByEndDateBeforeAndApprovalStatusIn(LocalDate.now())).thenReturn(1L);
//
//        AdminDashboardStatisticsDTO adminDashboardStatisticsDTO = adminServiceImpl.dashboardStatistics();
//
//        assertNotNull(adminDashboardStatisticsDTO);
//
//    }

//    @DisplayName("Specfic Learning Path Details Test")
//    @Test
//     void specificLearningPathDetails() {
//        LearningPathEmployees learningPathEmployees = Mockito.mock(LearningPathEmployees.class);
//
//        List<LearningPathEmployees> learningPathEmployeesList = new ArrayList<>();
//        learningPathEmployeesList.add(learningPathEmployees);
//
//        Mockito.when(employeesRepository.findByLearningPathId(Mockito.anyLong())).thenReturn(learningPathEmployeesList);
//        int size = adminServiceImpl.specificLearningPathDetails(1L).size();
//        assertEquals(1, size);
//
//    }


}
