package com.xebia.learningmanagement.api;

import com.xebia.learningmanagement.dtos.AdminDashboardDetailsDTO;
import com.xebia.learningmanagement.dtos.AdminDashboardStatisticsDTO;
import com.xebia.learningmanagement.dtos.MadeForEmployeeDto;
import com.xebia.learningmanagement.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotBlank;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/admin/v1/dashboard/details")
    public List<AdminDashboardDetailsDTO> dashboardDetails() {
        return adminService.dashboardDetails();
    }

    @GetMapping("/admin/v1/dashboard/stats")
    public AdminDashboardStatisticsDTO dashboardStatistics() {
        return adminService.dashboardStatistics();
    }

    @GetMapping("/admin/v1/learningPath/details")
    public List<MadeForEmployeeDto> specificLearningPathDetails(@RequestParam @NotBlank Long learningPathId) {
        return adminService.specificLearningPathDetails(learningPathId);
    }

}