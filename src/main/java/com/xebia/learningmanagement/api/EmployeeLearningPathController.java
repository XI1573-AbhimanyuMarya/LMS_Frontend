package com.xebia.learningmanagement.api;

import com.xebia.learningmanagement.dtos.request.EmployeeEmailRequest;
import com.xebia.learningmanagement.exception.LearningPathException;
import com.xebia.learningmanagement.dtos.response.UserResponse;
import com.xebia.learningmanagement.service.EmployeeLearningPathService;
import com.xebia.learningmanagement.service.LearningPathService;
import com.xebia.learningmanagement.util.ErrorBank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("/employeelearning")

public class EmployeeLearningPathController {
    @Autowired
    EmployeeLearningPathService employeelearningservice;

    @Autowired
    protected LearningPathService learningPathService;

    /***
     *
     *
     * @return
     * @throws LearningPathException
     */
    @PostMapping("/deletelearningpath")
    public ResponseEntity<UserResponse> editLearningPath(@RequestBody final Map userdata) throws LearningPathException {
        UserResponse userResponse = new UserResponse();
        try {
            if(userdata.containsKey("ids")){
                employeelearningservice.deleteLearningPath(userdata);
            }else{
                throw new LearningPathException(ErrorBank.NO_KEY_FOUND);
            }
            userResponse.setStatus("success");
            return ResponseEntity.ok(userResponse);
        } catch (LearningPathException e) {
            userResponse.setStatus("failure");
            userResponse.setMessage(e.getLocalizedMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(userResponse);
        }
    }

    @GetMapping("/myLearningPath")
    public void getMyLearningPath(@RequestBody EmployeeEmailRequest employeeEmail) {
        employeelearningservice.getMyAssignedLearningPaths(employeeEmail);
    }





}
