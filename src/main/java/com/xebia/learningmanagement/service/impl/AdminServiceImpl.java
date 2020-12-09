package com.xebia.learningmanagement.service.impl;

import com.xebia.learningmanagement.dtos.AdminDashboardDetailsDTO;
import com.xebia.learningmanagement.dtos.AdminDashboardStatisticsDTO;
import com.xebia.learningmanagement.dtos.MadeForEmployeeDto;
import com.xebia.learningmanagement.entity.LearningPath;
import com.xebia.learningmanagement.entity.LearningPathEmployees;
import com.xebia.learningmanagement.repository.LearningPathEmployeesRepository;
import com.xebia.learningmanagement.repository.LearningPathRepository;
import com.xebia.learningmanagement.service.AdminService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private LearningPathEmployeesRepository employeesRepository;

    @Autowired
    private LearningPathRepository learningPathRepository;

    @Override
    public List<AdminDashboardDetailsDTO> dashboardDetails() {
        List<LearningPathEmployees> learningPathEmployeesList = employeesRepository.findAll();
        List<AdminDashboardDetailsDTO> organizationLevelDetailsList = learningPathEmployeesList.stream().map(this::dashboardDetailsToAdminDashboardDetailsDTO).collect(Collectors.toList());
        return organizationLevelDetailsList.stream().distinct().collect(Collectors.toList());
    }


    public AdminDashboardDetailsDTO dashboardDetailsToAdminDashboardDetailsDTO(LearningPathEmployees LEARNING_PATH_EMPLOYEES) {

        List<LearningPathEmployees> learningPathEmployeesList = employeesRepository.findAll();
        Map<LearningPath, Long> LEARNING_PATH_ASSIGNED_TO_EMPLOYEE_COUNT = learningPathEmployeesList.stream().collect(Collectors.groupingBy(LearningPathEmployees::getLearningPath, Collectors.counting()));
        Map<LearningPath, Long> LEARNING_PATH_COMPLETED_COUNT = learningPathEmployeesList.stream().filter(a -> a.getPercentCompleted() == 100).collect(Collectors.groupingBy(LearningPathEmployees::getLearningPath, Collectors.counting()));
        Map<LearningPath, Long> LEARNING_PATH_INPROGRESS_COUNT = learningPathEmployeesList.stream().filter(a -> a.getPercentCompleted() != 100).collect(Collectors.groupingBy(LearningPathEmployees::getLearningPath, Collectors.counting()));
        Map<LearningPath, Long> LEARNING_PATH_OVERDUE_COUNT = learningPathEmployeesList.stream().filter(a -> a.getIsLearningPathExpired().equals(true)).collect(Collectors.groupingBy(LearningPathEmployees::getLearningPath, Collectors.counting()));

        return AdminDashboardDetailsDTO.builder().learningPathName(LEARNING_PATH_EMPLOYEES.getLearningPath().getName())
                .learningPathId(LEARNING_PATH_EMPLOYEES.getLearningPath().getId())
                .employeesAssignedCount(LEARNING_PATH_ASSIGNED_TO_EMPLOYEE_COUNT.getOrDefault(LEARNING_PATH_EMPLOYEES.getLearningPath(), (long) 0))
                .employeesCompletedCount(LEARNING_PATH_COMPLETED_COUNT.getOrDefault(LEARNING_PATH_EMPLOYEES.getLearningPath(), (long) 0))
                .employeesInprogressCount(LEARNING_PATH_INPROGRESS_COUNT.getOrDefault(LEARNING_PATH_EMPLOYEES.getLearningPath(), (long) 0))
                .employeesOverdueCount(LEARNING_PATH_OVERDUE_COUNT.getOrDefault(LEARNING_PATH_EMPLOYEES.getLearningPath(), (long) 0)).build();

    }


    @Override
    public AdminDashboardStatisticsDTO dashboardStatistics() {
        long TOTAL_LEARNING_PATH_ASSIGNED = employeesRepository.count();
        long TOTAL_LEARNING_PATH_COMPLETED = employeesRepository.countByPercentCompleted(100);
        long TOTAL_LEARNING_PATH_INPROGRESS = employeesRepository.countByPercentCompletedNot(100);
        //TODO : Yet to implement logic LEARNING_PATH_EXPIRED should ony be for LP's which are yet not Approved/rejected or not in pending state
        long TOTAL_LEARNING_PATH_EXPIRED = employeesRepository.countByIsLearningPathExpired(true);

        return AdminDashboardStatisticsDTO.builder()
                .totalLearningPathAssigned(TOTAL_LEARNING_PATH_ASSIGNED)
                .totalLearningPathCompleted(TOTAL_LEARNING_PATH_COMPLETED)
                .totalLearningPathInProgress(TOTAL_LEARNING_PATH_INPROGRESS)
                .totalLearningPathExpired(TOTAL_LEARNING_PATH_EXPIRED).build();

    }


    @Override
    public List<MadeForEmployeeDto> specificLearningPathDetails(Long learningPathId) {
        ModelMapper modelMapper = new ModelMapper();
        List<LearningPathEmployees> learningPathEmployees = employeesRepository.findByLearningPathId(learningPathId);
        return learningPathEmployees.stream().map(a -> modelMapper.map(a, MadeForEmployeeDto.class)).collect(Collectors.toList());
    }
}