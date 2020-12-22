package com.xebia.learningmanagement.api;

import com.xebia.learningmanagement.dtos.ApprovalDto;
import com.xebia.learningmanagement.dtos.EmployeeDto;
import com.xebia.learningmanagement.dtos.LearningPathDto;
import com.xebia.learningmanagement.dtos.LearningPathManagerDto;
import com.xebia.learningmanagement.dtos.request.AssignLearningPathRequest;
import com.xebia.learningmanagement.dtos.request.LearningPathEmployeeApprovalRequest;
import com.xebia.learningmanagement.dtos.request.ManagerEmailRequest;
import com.xebia.learningmanagement.dtos.response.UserResponse;
import com.xebia.learningmanagement.entity.Courses;
import com.xebia.learningmanagement.entity.LearningPath;
import com.xebia.learningmanagement.exception.LearningPathEmployeesException;
import com.xebia.learningmanagement.exception.LearningPathException;
import com.xebia.learningmanagement.service.LearningPathService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class LearningPathController {

    Logger logger = LoggerFactory.getLogger(LearningPathController.class);

    @Autowired
    LearningPathService learningPathService;


    @PostMapping("/learningPath")
    public ResponseEntity<UserResponse> createLearningPath(@RequestBody @Valid LearningPathDto pathRequest) throws Exception {
        UserResponse userResponse = new UserResponse();
        LearningPathDto.Path path = pathRequest.getPath();
        learningPathService.createLearningPath(path);
        userResponse.setMessage("Learning path created");
        userResponse.setStatus("success");
        return ResponseEntity.ok(userResponse);
    }

    /***
     * Get mapping Does not support Request Body so changing the mapping to @PostMapping
     * https://stackoverflow.com/questions/978061/http-get-with-request-body/983458#983458
     * @param managerEmail
     * @return
     * @throws LearningPathException
     */
    @PostMapping("/getAssignedLearningPaths")
    public ResponseEntity getAllAssignedLearningPath(@RequestBody ManagerEmailRequest managerEmail) throws LearningPathException {
        UserResponse userResponse = new UserResponse();
        Map<Long, List<LearningPathManagerDto>> allAssignedLearningPath;
        try {
            if (managerEmail != null && !"".equalsIgnoreCase(managerEmail.getManagerEmail())) {
                allAssignedLearningPath = learningPathService.getAllAssignedLearningPath(managerEmail);
            } else {
                throw new LearningPathException("Wrong Format for Managers Email");
            }
        } catch (LearningPathException e) {
            userResponse.setStatus("failure");
            userResponse.setMessage(e.getLocalizedMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(userResponse);
        }

        return new ResponseEntity(allAssignedLearningPath, HttpStatus.OK);

    }

    @GetMapping(value = "/learningPath/courses/{learningPathId}")
    public List<Courses> getCoursesDetailsForLearningPath(@PathVariable("learningPathId") Long learningPathId){
        logger.info("Fetching all the courses inside the specific learning Paths ID-"+ learningPathId);
        return learningPathService.getCourseDetails(learningPathId);
    }

    @PostMapping(value = "/pending/approvals")
    public ResponseEntity needsApproval(@RequestBody ManagerEmailRequest managerEmailRequest) {
        UserResponse userResponse = new UserResponse();
        List<ApprovalDto> pendingApprovals;
        try {
            if (managerEmailRequest != null && !"".equalsIgnoreCase(managerEmailRequest.getManagerEmail())) {
                pendingApprovals = learningPathService.getPendingApprovals(managerEmailRequest);
            } else {
                throw new LearningPathException("Wrong Format for Managers Email");
            }
        } catch (Exception e) {
            userResponse.setStatus("failure");
            userResponse.setMessage(e.getLocalizedMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(userResponse);
        }
        return new ResponseEntity(pendingApprovals, HttpStatus.OK);

    }

    @PutMapping(value = "/review/approvals")
    public ResponseEntity approveLearningPath(@RequestBody LearningPathEmployeeApprovalRequest request) {
        UserResponse userResponse = new UserResponse();
        try {
            if (request.getLearningPathEmployeeId() != null && request.getStatus() != null) {
                learningPathService.approveRequests(request);
            } else {
                throw new LearningPathEmployeesException("Learning Path EmployeeId should not be null & Approval Status should be in format APPROVED/REJECTED only");
            }
        } catch (Exception e) {
            userResponse.setStatus("failure");
            userResponse.setMessage(e.getLocalizedMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(userResponse);
        }
        return ResponseEntity.ok(HttpStatus.ACCEPTED);
    }

    @GetMapping(value = "/learningPath/courseDetails/{assigneeId}")
    public ResponseEntity<Object> getLearningPathWithCourseDetails(@PathVariable("assigneeId") Long assigneeId) {
        logger.info("Fetching all the learning Paths made by manager "+ assigneeId);
        try {

            List<LearningPath> learningPathCourseList = learningPathService.getLearningPathWithCourse(assigneeId);

            if (Objects.nonNull(learningPathCourseList)) {
                return new ResponseEntity<Object>(learningPathCourseList, HttpStatus.OK);
            } else {
                return new ResponseEntity<Object>("No Learning Path exists", HttpStatus.FORBIDDEN);
            }

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error at backend");
        }

    }


    @PutMapping(value = "/learningPath/assignLearningPaths")
    public ResponseEntity<String> saveAssignLearningPaths(@RequestBody @Valid AssignLearningPathRequest request) {

        try {

            learningPathService.saveAssignLearningPaths(request);
            return new ResponseEntity<String>("LearningPath successfully assigned", HttpStatus.OK);
        } catch (Exception e) {
            logger.info(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error at backend");
        }
    }


}
