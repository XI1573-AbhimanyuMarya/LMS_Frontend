package com.xebia.learningmanagement.service;

import com.xebia.learningmanagement.entity.Courses;

import java.util.List;
import java.util.Set;

public interface CourseService {

	Set<Courses> getCoursesByKeyword(String keyword);

	List<Courses> getAllCourses();

}
