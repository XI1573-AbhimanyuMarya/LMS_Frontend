package com.xebia.learningmanagement.api;

import com.xebia.learningmanagement.dtos.*;
import com.xebia.learningmanagement.dtos.request.AdminDeleteLearningPathDetails;
import com.xebia.learningmanagement.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
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
    public DashboardStatisticsDTO dashboardStatistics() {
        return adminService.dashboardStatistics();
    }

    @GetMapping("/api/v1/learningPath/details")
    public LearningPathAdminDetailsDTO specificLearningPathDetails(@RequestParam @NotBlank Long learningPathId) {
        return adminService.specificLearningPathDetails(learningPathId);
    }

    @GetMapping("/api/v1/dashboard/graph/data/")
    public List<DashboardGraphStatisticsStatusDTO> dashboardGraphStatistics() {
        return adminService.dashboardGraphStatistics();
    }

    @GetMapping("/api/v1/manage/learningPaths/assigned")
    public List<AdminManageLearningPathsDTO> manageOrganizationsLearningPath() {
        return adminService.manageAssignedLearningPaths();
    }

    @ResponseStatus(HttpStatus.ACCEPTED)
    @DeleteMapping("/api/v1/delete/learningPaths")
    public void deleteCompletePathAndItsDetails(@RequestBody @Valid AdminDeleteLearningPathDetails learningPathIds) {
        adminService.deleteCompletePathAndItsDetails(learningPathIds);
    }


}