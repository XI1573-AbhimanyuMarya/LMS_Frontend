package com.xebia.learningmanagement.api;

import com.xebia.learningmanagement.dtos.LearningPathDto;
import com.xebia.learningmanagement.dtos.ListOfLearningPathAssignedDto;
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
     *
     * @param managerEmail
     * @return
     * @throws LearningPathException
     */
    @GetMapping("/getAssignedLearningPaths")
    public ResponseEntity getAllAssignedLearningPath(@RequestBody ManagerEmailRequest managerEmail) throws LearningPathException {
        UserResponse userResponse =new UserResponse();
        ListOfLearningPathAssignedDto allAssignedLearningPath;
        try {
            if (managerEmail!=null && !"".equalsIgnoreCase(managerEmail.getManagerEmail())){
                allAssignedLearningPath = learningPathService.getAllAssignedLearningPath(managerEmail);
            }else {
                throw new LearningPathException("Wrong Format for Managers Email");
            }
        }catch (LearningPathException e){
            userResponse.setStatus("failure");
            userResponse.setMessage(e.getLocalizedMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(userResponse);
        }

        return new ResponseEntity(allAssignedLearningPath, HttpStatus.OK);

    }

}
