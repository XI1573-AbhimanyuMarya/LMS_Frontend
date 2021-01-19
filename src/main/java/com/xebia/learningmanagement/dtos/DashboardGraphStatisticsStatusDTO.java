package com.xebia.learningmanagement.dtos;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class DashboardGraphStatisticsStatusDTO {
    private String status;
    private List<DashboardGraphStatisticsDTO> dashboardGraphStatistics;
}
