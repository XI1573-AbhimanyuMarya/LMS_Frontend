package com.xebia.learningmanagement.api;

import com.xebia.learningmanagement.entity.Courses;
import com.xebia.learningmanagement.service.CourseService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@CrossOrigin("*")
@RestController
@Slf4j
@RequestMapping("/course")
public class CourseController {

    @Autowired
    CourseService courseService;

    @GetMapping("/api/v1/getCourses/{keyword}")
    public Set<Courses> getCoursesAccordingToKeyword(@PathVariable("keyword") String keyword) {
        log.info("Fetching results containing keyword :" + keyword);
        return courseService.getCoursesByKeyword(keyword);
    }

    @GetMapping("/api/v1/allcourses")
    public List<Courses> getAllCourses() {
        log.info("Fetching list of all available courses");
        return courseService.getAllCourses();
    }

}
