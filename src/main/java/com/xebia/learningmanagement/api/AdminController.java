package com.xebia.learningmanagement.api;

import com.xebia.learningmanagement.dtos.*;
import com.xebia.learningmanagement.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotBlank;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/api/v1/dashboard/details")
    public List<AdminDashboardDetailsDTO> dashboardDetails() {
        return adminService.dashboardDetails();
    }

    @GetMapping("/api/v1/dashboard/stats")
    public AdminDashboardStatisticsDTO dashboardStatistics() {
        return adminService.dashboardStatistics();
    }

    @GetMapping("/api/v1/learningPath/details")
    public List<MadeForEmployeeDto> specificLearningPathDetails(@RequestParam @NotBlank Long learningPathId) {
        return adminService.specificLearningPathDetails(learningPathId);
    }

    @GetMapping("/api/v1/dashboard/graph/data/")
    public List<DashboardGraphStatisticsStatusDTO> dashboardGraphStatistics() ) {
        return adminService.dashboardGraphStatistics();
    }


}