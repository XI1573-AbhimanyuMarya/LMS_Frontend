package com.xebia.learningmanagement.api;

import com.xebia.learningmanagement.entity.LearningPath;
import com.xebia.learningmanagement.model.LearningPathDto;
import com.xebia.learningmanagement.model.LearningPathListListDto;
import com.xebia.learningmanagement.model.ManagerUsernameDto;
import com.xebia.learningmanagement.response.UserResponse;
import com.xebia.learningmanagement.service.LearningPathService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

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

    @GetMapping("/getAllAssignedLearningPath")
    public ResponseEntity getAllAssignedLearningPath(@RequestBody ManagerUsernameDto managerUsername) {

        LearningPathListListDto allAssignedLearningPath = learningPathService.getAllAssignedLearningPath(managerUsername);
        return new ResponseEntity(allAssignedLearningPath, HttpStatus.OK);

    }

}
