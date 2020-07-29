package com.xebia.learningmanagement.controller;

import com.xebia.learningmanagement.entity.Category;
import com.xebia.learningmanagement.entity.Courses;
import com.xebia.learningmanagement.model.*;
import com.xebia.learningmanagement.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

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

    @PostMapping(value = "/createCourse")
    public ResponseEntity<?> createCourse(@RequestBody Courses courses) {
        courses = courseService.createCourse(courses);
        if (courses != null) {
            return new ResponseEntity<>(courses, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = "/getCourse/{name}")
    public Courses getCourse(@PathVariable(name = "name") String name) {
        return courseService.findByCourseName(name);

    }

    @PostMapping(value = "/createCategory")
    public ResponseEntity<?> createCategory(@RequestBody CategoryDto categoryDto) {
        Category category = courseService.createCategory(categoryDto);
        if (category != null) {
            return new ResponseEntity<>(category, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = "/getCategory/{id}")
    public Category getCategory(@PathVariable(name = "id") Long id) {
        return courseService.findByCategoryId(id);
    }

//	@GetMapping(value = "/getCategoryCode/{code}")
//	public Category getCategory(@PathVariable(name = "code") String code) {
//
////		return courseService.findByCode(code);
//	}

}
