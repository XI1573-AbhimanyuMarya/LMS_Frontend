package com.xebia.learningmanagement.api;

import com.xebia.learningmanagement.dtos.LearningPathDto;
import com.xebia.learningmanagement.dtos.ListOfLearningPathsAssignedByManagerDto;
import com.xebia.learningmanagement.dtos.request.ManagerEmailRequest;
import com.xebia.learningmanagement.dtos.response.UserResponse;
import com.xebia.learningmanagement.exception.LearningPathException;
import com.xebia.learningmanagement.service.LearningPathService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

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
        ListOfLearningPathsAssignedByManagerDto allAssignedLearningPath;
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


}
