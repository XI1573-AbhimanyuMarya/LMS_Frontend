package com.xebia.learningmanagement.api;

import com.xebia.learningmanagement.dtos.*;
import com.xebia.learningmanagement.dtos.request.LearningPathEmployeeApprovalRequest;
import com.xebia.learningmanagement.dtos.request.ManagerEmailRequest;
import com.xebia.learningmanagement.dtos.response.UserResponse;
import com.xebia.learningmanagement.exception.LearningPathEmployeesException;
import com.xebia.learningmanagement.exception.LearningPathException;
import com.xebia.learningmanagement.service.LearningPathService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class LearningPathController {
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
        Map<EmployeeDto, List<LearningPathManagerDto>> allAssignedLearningPath;
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


}
