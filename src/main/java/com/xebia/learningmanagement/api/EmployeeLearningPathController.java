package com.xebia.learningmanagement.api;

import com.xebia.learningmanagement.dtos.EmployeeLearningPathStatisticsDto;
import com.xebia.learningmanagement.dtos.request.CourseCompletedPercentRequest;
import com.xebia.learningmanagement.dtos.request.EmployeeEmailRequest;
import com.xebia.learningmanagement.dtos.request.EmployeeLearningRateRequest;
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
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("/employeelearning")
public class EmployeeLearningPathController {

    @Autowired
    private EmployeeLearningPathService employeelearningservice;

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

    /***
     * Get mapping Does not support Request Body so changing the mapping to @PostMapping
     * https://stackoverflow.com/questions/978061/http-get-with-request-body/983458#983458
     * @param employeeEmail
     * @return
     * @throws LearningPathException
     */
    @PostMapping("/myLearningPath")
    public ResponseEntity getMyLearningPath(@RequestBody EmployeeEmailRequest employeeEmail) throws LearningPathException {
        UserResponse userResponse = new UserResponse();
        List<EmployeeLearningPathStatisticsDto> employeeLearningPathStatistics;
        try {
            if (employeeEmail != null && !"".equalsIgnoreCase(employeeEmail.getEmployeeEmail())) {
                employeeLearningPathStatistics = employeelearningservice.getMyAssignedLearningPaths(employeeEmail);
            } else {
                throw new LearningPathException("Wrong Format for Employee Email");
            }

        } catch (LearningPathException e) {
            userResponse.setStatus("failure");
            userResponse.setMessage(e.getLocalizedMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(userResponse);
        }

        return new ResponseEntity(employeeLearningPathStatistics, HttpStatus.OK);

    }

    @PutMapping(value = "/myLearningRate", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity updateLearningPathProgress(@ModelAttribute EmployeeLearningRateRequest employeeLearningRateRequest) throws LearningPathException {
        UserResponse userResponse = new UserResponse();
        EmployeeLearningPathStatisticsDto employee;
        try {
            if (employeeLearningRateRequest.getPercentCompleted() != null
                    && employeeLearningRateRequest.getLearningPathEmployeeId() != null) {
                employee = employeelearningservice.updateLearningPathProgress(employeeLearningRateRequest);
            } else {
                throw new LearningPathException("Wrong Format for Employee Learning Rate Request");
            }

        } catch (LearningPathException | IOException e) {
            userResponse.setStatus("failure");
            userResponse.setMessage(e.getLocalizedMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(userResponse);
        }

        return new ResponseEntity(employee, HttpStatus.ACCEPTED);
    }

    @PostMapping(value = "/api/v1/update/courseratings", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, String> addCourseRating(@Valid @RequestBody CourseCompletedPercentRequest courseCompleteRequest) {
//        return employeelearningservice.addCourseRating(courseCompleteRequest);
        return  employeelearningservice.saveOrUpdateCourseRating(courseCompleteRequest);
    }
    @PutMapping(value="/api/v1/updatecourserating/{ratingId}",consumes=MediaType.APPLICATION_JSON_VALUE)
    public Map<String,String> updateCourseRating(@PathVariable long ratingId,@Valid @RequestBody CourseCompletedPercentRequest courseCompleteRequest)
    {
   return employeelearningservice.updateCourseRating(ratingId,courseCompleteRequest);
    }

    @GetMapping(value = "/api/v1/getcoursecompletedaverage/{learningPathId}/{employeeId}")
    public Map<String, Integer> getCompletionAverage(@PathVariable Long learningPathId, @PathVariable Long employeeId) {

        Map<String, Integer> data = new HashMap<>();
        data.put("courseAverage", employeelearningservice.courseCompletionAverage(employeeId, learningPathId));
        return data;
    }


}
