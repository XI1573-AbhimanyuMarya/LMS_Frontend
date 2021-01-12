package com.xebia.learningmanagement.service.impl;

import com.xebia.learningmanagement.dtos.AdminDashboardDetailsDTO;
import com.xebia.learningmanagement.dtos.AdminDashboardStatisticsDTO;
import com.xebia.learningmanagement.dtos.DashboardGraphStatisticsDTO;
import com.xebia.learningmanagement.dtos.MadeForEmployeeDto;
import com.xebia.learningmanagement.entity.LearningPath;
import com.xebia.learningmanagement.entity.LearningPathEmployees;
import com.xebia.learningmanagement.repository.LearningPathEmployeesRepository;
import com.xebia.learningmanagement.repository.LearningPathRepository;
import com.xebia.learningmanagement.service.AdminService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DateFormatSymbols;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.xebia.learningmanagement.enums.LearningPathApprovalStatus.APPROVED;
import static com.xebia.learningmanagement.enums.LearningPathApprovalStatus.REJECTED;

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
        long totalLearningPathCompleted = employeesRepository.countByPercentCompletedAndApprovalStatus(100, APPROVED);
        long totalLearningPathInprogress = employeesRepository.countByPercentCompletedNotOrApprovalStatus(100, REJECTED);
        long totalLearningPathExpired = employeesRepository.countByEndDateBefore(LocalDate.now());

        return AdminDashboardStatisticsDTO.builder()
                .totalLearningPathAssigned(totalLearningPathAssigned)
                .totalLearningPathCompleted(totalLearningPathCompleted)
                .totalLearningPathInProgress(totalLearningPathInprogress)
                .totalLearningPathExpired(totalLearningPathExpired).build();

    }


    @Override
    public List<MadeForEmployeeDto> specificLearningPathDetails(Long learningPathId) {
        ModelMapper modelMapper = new ModelMapper();
        // TODO  As per zeplin Level to be added in percent completed "Completed", "Expired to be produced at frontend
        List<LearningPathEmployees> learningPathEmployees = employeesRepository.findByLearningPathId(learningPathId);
        return learningPathEmployees.stream().map(a -> modelMapper.map(a, MadeForEmployeeDto.class)).collect(Collectors.toList());
    }


    @Override
    public List<DashboardGraphStatisticsDTO> dashboardGraphStatistics(String month) {
        DateFormatSymbols dfs = new DateFormatSymbols();
        List<String> monthsCollection = Arrays.stream(dfs.getMonths()).filter(a -> !a.equals("")).collect(Collectors.toList());

        final List<LearningPathEmployees> learningPathEmployeesList = employeesRepository.findAll();
        final Map<String, Long> completedCount = learningPathEmployeesList.stream().filter(x -> x.getApprovalStatus().equals(APPROVED)).collect(Collectors.groupingBy(a -> a.getMonthlyProgressModifiedDate().getMonth().toString(), Collectors.counting()));
        final Map<String, Long> inProgressCount = learningPathEmployeesList.stream().filter(x -> !x.getApprovalStatus().equals(APPROVED)).collect(Collectors.groupingBy(a -> a.getMonthlyProgressModifiedDate().getMonth().toString(), Collectors.counting()));
        final Map<String, Long> overdueCount = learningPathEmployeesList.stream().filter(a -> a.getEndDate().compareTo(LocalDate.now()) < 0).collect(Collectors.groupingBy(x -> x.getMonthlyProgressModifiedDate().getMonth().toString(), Collectors.counting()));
        List<DashboardGraphStatisticsDTO> graphStatisticsDTOList = new ArrayList<>();
        for (String mnth : monthsCollection) {
            DashboardGraphStatisticsDTO graphStatistics = DashboardGraphStatisticsDTO.builder()
                    .month(mnth.toUpperCase())
                    .employeesCompletedCount(completedCount.getOrDefault(mnth.toUpperCase(), (long) 0))
                    .employeesInprogressCount(inProgressCount.getOrDefault(mnth.toUpperCase(), (long) 0))
                    .employeesOverdueCount(overdueCount.getOrDefault(mnth.toUpperCase(), (long) 0))
                    .build();
            graphStatisticsDTOList.add(graphStatistics);
        }

        return graphStatisticsDTOList;
    }

}