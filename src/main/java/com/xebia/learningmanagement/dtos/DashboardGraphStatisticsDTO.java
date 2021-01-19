package com.xebia.learningmanagement.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DashboardGraphStatisticsDTO {
    private String month;
    private int count;
}
