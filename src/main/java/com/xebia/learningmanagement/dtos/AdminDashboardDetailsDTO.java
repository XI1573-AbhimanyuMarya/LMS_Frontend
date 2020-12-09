
package com.xebia.learningmanagement.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AdminDashboardDetailsDTO {
    private long learningPathId;
    private String learningPathName;
    private Long employeesAssignedCount;
    private Long employeesCompletedCount;
    private Long employeesInprogressCount;
    private Long employeesOverdueCount;
}