package com.xebia.learningmanagement.controller;

import com.xebia.learningmanagement.entity.Category;
import com.xebia.learningmanagement.entity.Courses;
import com.xebia.learningmanagement.entity.Duration;
import com.xebia.learningmanagement.model.*;
import com.xebia.learningmanagement.service.CourseService;
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

    @Autowired
    CourseService courseService;

    @GetMapping("/getCourses/{keyword}")
    public ResponseEntity<Set<Courses>> getCoursesAccordingToKeyword(@PathVariable("keyword") String keyword) {
        Set<Courses> courses = courseService.getCoursesByKeyword(keyword);
        return ResponseEntity.status(HttpStatus.OK).body(courses);
    }

    @GetMapping("/getAllCourses")
    public ResponseEntity<List<Courses>> getAllCourses(){
        List<Courses> allcourses=courseService.getAllCourses();
        return ResponseEntity.status(HttpStatus.OK).body(allcourses);
    }

}
