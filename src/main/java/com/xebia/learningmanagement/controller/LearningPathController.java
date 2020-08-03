package com.xebia.learningmanagement.controller;

import com.xebia.learningmanagement.model.LearningPathDto;
import com.xebia.learningmanagement.model.LoginResponse;
import com.xebia.learningmanagement.model.UserResponse;
import com.xebia.learningmanagement.service.LearningPathService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public ResponseEntity<UserResponse> createLearningPath(@RequestBody @Valid LearningPathDto pathRequest) {
        UserResponse userResponse = new UserResponse();
        System.out.println(pathRequest.getPath());
        LearningPathDto.Path path = pathRequest.getPath();
//            System.out.println("courses = " + path.getCoursesId());
//            System.out.println("duration = " + path.getDuration());
//            System.out.println("madeBy = " + path.getMadeById());
//            System.out.println("name = " + path.getName());
//            System.out.println("madeFor = " + path.getMadeForId());
        learningPathService.createLearningPath(path);

        userResponse.setMessage("Learning path created");
        userResponse.setStatus("success");

        return ResponseEntity.ok(userResponse);

    }

//    @GetMapping("/getPath")
//    public ResponseEntity<Path> showPath() {
//        List<Long> madefor = Arrays.asList(101l, 102l, 103l);
//        List<Long> courses = Arrays.asList(201l, 203l, 204l, 205l);
//        Path path = new Path("nameL1", 103l, madefor, courses, 3);
//        return ResponseEntity.ok(path);
//    }

//    @PostMapping("/test")
//    public void testing(@Valid @RequestBody Path path) {
//
//    }
}
