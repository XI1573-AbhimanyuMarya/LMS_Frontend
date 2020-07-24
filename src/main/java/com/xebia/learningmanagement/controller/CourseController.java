package com.xebia.learningmanagement.controller;

import com.xebia.learningmanagement.model.*;
import com.xebia.learningmanagement.service.CompentencyHeadService;
import com.xebia.learningmanagement.service.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api")
public class CourseController {

	@Autowired
	ServiceImpl courseService;
	@Autowired
	CompentencyHeadService compentencyHeadService;


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

	@PostMapping(name = "/createSubCategory")
	public ResponseEntity<?> createSubCategory(@RequestBody SubCategory subCategory) {
		subCategory = courseService.createSubCategory(subCategory);
		if (subCategory != null) {
			return new ResponseEntity<>(subCategory, HttpStatus.CREATED);
		} else {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping(value = "/getSubCategory/{id}")
	public SubCategory getSubCategory(@PathVariable(name = "id") Long id) {

		return courseService.findBySubCategoryId(id);
	}

	@GetMapping(value = "/getCompentency")
	public List<CompentencyHead> getCompentency(@RequestParam(name = "id") Long id,
												@RequestParam(name = "name") String name) {

		return compentencyHeadService.getCompentencyHead(id, name);
	}

	@PostMapping(value = "/createCompentency")
	public ResponseEntity<?> createCompentency(@RequestBody CompentencyHead compentencyHead) {
		compentencyHead = compentencyHeadService.createCompentency(compentencyHead);
		if (compentencyHead != null) {
			return new ResponseEntity<>(compentencyHead, HttpStatus.CREATED);
		} else {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping(value = "/getCategoryCode/{code}")
	public Category getCategory(@PathVariable(name = "code") String code) {

		return courseService.findByCode(code);
	}



}
