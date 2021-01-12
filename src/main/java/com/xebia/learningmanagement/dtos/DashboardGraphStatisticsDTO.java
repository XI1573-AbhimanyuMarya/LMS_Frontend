package com.xebia.learningmanagement.dtos;

import lombok.Builder;
import lombok.Data;

import java.time.Month;

@Data
@Builder
public class DashboardGraphStatisticsDTO {

    private String month;
    private Long employeesCompletedCount;
    private Long employeesInprogressCount;
    private Long employeesOverdueCount;
}
