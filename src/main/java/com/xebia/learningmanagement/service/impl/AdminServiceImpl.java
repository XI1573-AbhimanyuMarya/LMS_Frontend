package com.xebia.learningmanagement.service.impl;

import com.xebia.learningmanagement.dtos.*;
import com.xebia.learningmanagement.entity.LearningPath;
import com.xebia.learningmanagement.entity.LearningPathEmployees;
import com.xebia.learningmanagement.repository.LearningPathEmployeesRepository;
import com.xebia.learningmanagement.repository.LearningPathRepository;
import com.xebia.learningmanagement.service.AdminService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.text.DateFormatSymbols;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

import static com.xebia.learningmanagement.enums.LearningPathApprovalStatus.*;

@Service
public class AdminServiceImpl implements AdminService {


    private final LearningPathEmployeesRepository employeesRepository;
    private final LearningPathRepository learningPathRepository;


    @Autowired
    public AdminServiceImpl(LearningPathEmployeesRepository employeesRepository, LearningPathRepository learningPathRepository) {
        this.employeesRepository = employeesRepository;
        this.learningPathRepository = learningPathRepository;

    }


    @Override
    public List<AdminDashboardDetailsDTO> dashboardDetails() {
        List<LearningPathEmployees> learningPathEmployeesList = employeesRepository.findAll();
        List<AdminDashboardDetailsDTO> organizationLevelDetailsList = learningPathEmployeesList.stream().map(this::dashboardDetailsToAdminDashboardDetailsDTO).collect(Collectors.toList());
        return organizationLevelDetailsList.stream().distinct().collect(Collectors.toList());
    }


    public AdminDashboardDetailsDTO dashboardDetailsToAdminDashboardDetailsDTO(LearningPathEmployees learningPathEmployees) {

        List<LearningPathEmployees> learningPathEmployeesList = employeesRepository.findAll();
        Map<LearningPath, Long> learningPathAssignedToEmployeeCount = learningPathEmployeesList.stream().collect(Collectors.groupingBy(LearningPathEmployees::getLearningPath, Collectors.counting()));
        Map<LearningPath, Long> learningPathCompletedCount = learningPathEmployeesList.stream().filter(a -> a.getPercentCompleted() == 100).collect(Collectors.groupingBy(LearningPathEmployees::getLearningPath, Collectors.counting()));
        Map<LearningPath, Long> learningPathInprogressCount = learningPathEmployeesList.stream().filter(a -> a.getPercentCompleted() != 100).collect(Collectors.groupingBy(LearningPathEmployees::getLearningPath, Collectors.counting()));
        Map<LearningPath, Long> learningPathOverdueCount = learningPathEmployeesList.stream().filter(a -> a.getEndDate().compareTo(LocalDate.now()) < 0).collect(Collectors.groupingBy(LearningPathEmployees::getLearningPath, Collectors.counting()));

        return AdminDashboardDetailsDTO.builder().learningPathName(learningPathEmployees.getLearningPath().getName())
                .learningPathId(learningPathEmployees.getLearningPath().getId())
                .employeesAssignedCount(learningPathAssignedToEmployeeCount.getOrDefault(learningPathEmployees.getLearningPath(), (long) 0))
                .employeesCompletedCount(learningPathCompletedCount.getOrDefault(learningPathEmployees.getLearningPath(), (long) 0))
                .employeesInprogressCount(learningPathInprogressCount.getOrDefault(learningPathEmployees.getLearningPath(), (long) 0))
                .employeesOverdueCount(learningPathOverdueCount.getOrDefault(learningPathEmployees.getLearningPath(), (long) 0)).build();

    }


    @Override
    public AdminDashboardStatisticsDTO dashboardStatistics() {
        long totalLearningPathAssigned = learningPathRepository.count();
        long totalEmployeeRecords = employeesRepository.count();
        long totalLearningPathCompleted = employeesRepository.countByPercentCompletedAndApprovalStatus(100, APPROVED);
        long totalLearningPathInprogress = employeesRepository.countByPercentCompletedNotOrApprovalStatus(100, REJECTED);
        long totalLearningPathExpired = employeesRepository.countByEndDateBefore(LocalDate.now());

        return AdminDashboardStatisticsDTO.builder()
                .totalLearningPathAssigned(totalLearningPathAssigned)
                .totalLearningPathCompleted((int) Math.round((double) totalLearningPathCompleted / totalEmployeeRecords * 100))
                .totalLearningPathInProgress((int) Math.round((double) totalLearningPathInprogress / totalEmployeeRecords * 100))
                .totalLearningPathExpired((int) Math.round((double) totalLearningPathExpired / totalEmployeeRecords * 100)).build();

    }


    @Override
    public List<MadeForEmployeeDto> specificLearningPathDetails(Long learningPathId) {
        ModelMapper modelMapper = new ModelMapper();
        // TODO  As per zeplin Level to be added in percent completed "Completed", "Expired to be produced at frontend
        List<LearningPathEmployees> learningPathEmployees = employeesRepository.findByLearningPathId(learningPathId);
        return learningPathEmployees.stream().map(a -> modelMapper.map(a, MadeForEmployeeDto.class)).collect(Collectors.toList());
    }


    @Override
    public List<DashboardGraphStatisticsStatusDTO> dashboardGraphStatistics() {
        List<DashboardGraphStatisticsDTO> graphListForApproved = new ArrayList<>();
        List<DashboardGraphStatisticsDTO> graphListForInProgress = new ArrayList<>();
        List<DashboardGraphStatisticsDTO> graphListForOverdue= new ArrayList<>();
        List<DashboardGraphStatisticsStatusDTO> statusGraphList = new ArrayList<>();
        long totalCount= employeesRepository.count();

        List<Object> approvedObjectList = employeesRepository.countByApprovalStatusAndPercentCompletedGroupedByYearMonth(APPROVED.toString(), 100);

        for (Object object : approvedObjectList) {
            Object[] objectArray = (Object[]) object;
            DashboardGraphStatisticsDTO graphStatisticsDTO = DashboardGraphStatisticsDTO.builder()
                    .month(objectArray[0].toString())
                    .count((int) Math.round(new Double(objectArray[1].toString()) / totalCount * 100) )
                    .build();
            graphListForApproved.add(graphStatisticsDTO);
        }

        DashboardGraphStatisticsStatusDTO employeesCompletedCount = DashboardGraphStatisticsStatusDTO.builder()
                .status("COMPLETED")
                .dashboardGraphStatistics(graphListForApproved)
                .build();

        statusGraphList.add(employeesCompletedCount);

//---------------------
        List<Object> inProgressObjectList = employeesRepository.countByApprovalStatusNotApprovedAndPercentCompletedGroupedByYearMonth(APPROVED.toString());

        for (Object object : inProgressObjectList) {
            Object[] objectArray = (Object[]) object;
            DashboardGraphStatisticsDTO graphStatisticsDTO = DashboardGraphStatisticsDTO.builder()
                    .month(objectArray[0].toString())
                    .count((int) Math.round(new Double(objectArray[1].toString()) / totalCount* 100))
                    .build();
            graphListForInProgress.add(graphStatisticsDTO);
        }

        DashboardGraphStatisticsStatusDTO employeesInProgressCount = DashboardGraphStatisticsStatusDTO.builder()
                .status("IN-PROGRESS")
                .dashboardGraphStatistics(graphListForInProgress)
                .build();

        statusGraphList.add(employeesInProgressCount);

//---------------------
        List<Object> overDueObjectList = employeesRepository.countByOverdueAndPercentCompletedGroupedByYearMonth(YTBD.toString());

        for (Object object : overDueObjectList) {
            Object[] objectArray = (Object[]) object;
            DashboardGraphStatisticsDTO graphStatisticsDTO = DashboardGraphStatisticsDTO.builder()
                    .month(objectArray[0].toString())
                    .count((int) Math.round(new Double(objectArray[1].toString()) / totalCount* 100))
                    .build();
            graphListForOverdue.add(graphStatisticsDTO);
        }

        DashboardGraphStatisticsStatusDTO employeesOverdueCount = DashboardGraphStatisticsStatusDTO.builder()
                .status("OVERDUE")
                .dashboardGraphStatistics(graphListForOverdue)
                .build();

        statusGraphList.add(employeesOverdueCount);



        return statusGraphList;
    }

}