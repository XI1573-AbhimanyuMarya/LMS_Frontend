package com.xebia.learningmanagement.api;

import com.xebia.learningmanagement.dtos.ApprovalDto;
import com.xebia.learningmanagement.dtos.LearningPathCourseDetailsDTO;
import com.xebia.learningmanagement.dtos.LearningPathDto;
import com.xebia.learningmanagement.dtos.LearningPathManagerDto;
import com.xebia.learningmanagement.dtos.request.AssignLearningPathRequest;
import com.xebia.learningmanagement.dtos.request.LearningPathEmployeeApprovalRequest;
import com.xebia.learningmanagement.dtos.request.ManagerEmailRequest;
import com.xebia.learningmanagement.dtos.response.UserResponse;
import com.xebia.learningmanagement.entity.LearningPath;
import com.xebia.learningmanagement.service.LearningPathService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@RestController
@Slf4j
@RequestMapping("/manager")
public class LearningPathController {
    @Autowired
    LearningPathService learningPathService;


    @PostMapping("/api/v1/create/learningPath")
    public ResponseEntity<UserResponse> createLearningPath(@RequestBody @Valid LearningPathDto pathRequest) throws Exception {
        UserResponse userResponse = new UserResponse();
        LearningPathDto.Path path = pathRequest.getPath();
        learningPathService.createLearningPath(path);
        userResponse.setMessage("Learning path created");
        userResponse.setStatus("success");
        return ResponseEntity.ok(userResponse);
    }

    @PostMapping("/api/v1/manage/learningPaths/assigned")
    public Map<Long, List<LearningPathManagerDto>> manageAssignedLearningpaths(@Valid @RequestBody ManagerEmailRequest managerEmail) {
        return learningPathService.manageAssignedLearningPaths(managerEmail);
    }

    @GetMapping(value = "/api/v1/learningPath/courses/{learningPathId}/{employeeId}")
    public List<LearningPathCourseDetailsDTO> getCoursesDetailsForLearningPath(@PathVariable("learningPathId") long learningPathId, @PathVariable("employeeId") long employeeId) {
        log.info("Fetching all the courses inside the specific a learning Paths with ID-" + learningPathId + " for employee with ID-" + employeeId);
        return learningPathService.getCourseDetails(learningPathId, employeeId);
    }

    @PostMapping(value = "/api/v1/pending/approvals")
    public List<ApprovalDto> needsApproval(@Valid @RequestBody ManagerEmailRequest managerEmailRequest) {
        return learningPathService.getPendingApprovals(managerEmailRequest);
    }

    @PutMapping(value = "/api/v1/review/approvals")
    public ResponseEntity<Object> approveLearningPath(@Valid @RequestBody LearningPathEmployeeApprovalRequest request) throws Exception {
        learningPathService.approveRequests(request);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Review Successful");
    }

    @GetMapping(value = "/api/v1/details/learningPaths/{assigneeId}")
    public List<LearningPath> getAllLearningPathsMadeByAssignee(@PathVariable("assigneeId") Long assigneeId) {
        log.info("Fetching all pre-made learning Paths made earlier by managerID " + assigneeId);
        return learningPathService.getLearningPathWithCourse(assigneeId);
    }


    @PutMapping(value = "/api/v1/assign/learningPaths")
    public ResponseEntity<String> saveAssignLearningPaths(@RequestBody @Valid AssignLearningPathRequest request) throws Exception {
        learningPathService.saveAssignLearningPaths(request);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Learning path Assigned Successfully");

    }


}
