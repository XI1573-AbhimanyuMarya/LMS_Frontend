package com.xebia.learningmanagement.api;

import com.xebia.learningmanagement.dtos.EmployeeLearningPathStatisticsDto;
import com.xebia.learningmanagement.dtos.request.CourseCompletedPercentRequest;
import com.xebia.learningmanagement.dtos.request.EmployeeEmailRequest;
import com.xebia.learningmanagement.dtos.response.UserResponse;
import com.xebia.learningmanagement.exception.LearningPathException;
import com.xebia.learningmanagement.service.EmployeeLearningPathService;
import com.xebia.learningmanagement.util.ErrorBank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("/employee")
public class EmployeeLearningPathController {

    @Autowired
    private EmployeeLearningPathService employeelearningservice;


    @PostMapping(value = "/api/v1/delete/learningpath")
    public ResponseEntity<UserResponse> editLearningPath(@RequestBody final Map userdata) throws LearningPathException {
        UserResponse userResponse = new UserResponse();
        try {
            if (userdata.containsKey("ids")) {
                employeelearningservice.deleteLearningPath(userdata);
            } else {
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

    @ResponseStatus(HttpStatus.OK)
    @PostMapping(value = "/api/v1/mylearningpaths", consumes = MediaType.APPLICATION_JSON_VALUE)
    public List<EmployeeLearningPathStatisticsDto> getLearningPathsAssignedToMe(@Valid @RequestBody EmployeeEmailRequest employeeEmail) {
        return employeelearningservice.getLearningPathsAssignedToMe(employeeEmail);
    }

    @ResponseStatus(HttpStatus.OK)
    @PostMapping(value = "/api/v1/update/courseratings", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, String> addCourseRating(@Valid @RequestBody CourseCompletedPercentRequest courseCompleteRequest) throws Exception {
        return employeelearningservice.saveOrUpdateCourseRating(courseCompleteRequest);
    }


}
