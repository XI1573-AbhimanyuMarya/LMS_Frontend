package com.xebia.learningmanagement.api;

import com.xebia.learningmanagement.entity.Courses;
import com.xebia.learningmanagement.service.CourseService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class CourseController {

    Logger logger = LoggerFactory.getLogger(CourseController.class);

    @Autowired
    CourseService courseService;

    @GetMapping("/getCourses/{keyword}")
    public ResponseEntity<Set<Courses>> getCoursesAccordingToKeyword(@PathVariable("keyword") String keyword) {
        Set<Courses> courses = courseService.getCoursesByKeyword(keyword);
        return ResponseEntity.status(HttpStatus.OK).body(courses);
    }

    @GetMapping("/getAllCourses")
    public ResponseEntity<List<Courses>> getAllCourses() {
        logger.info("inside getAllCourses Controller");
        List<Courses> allcourses = courseService.getAllCourses();
        return ResponseEntity.status(HttpStatus.OK).body(allcourses);
    }

}