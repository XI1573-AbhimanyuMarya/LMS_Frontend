package com.xebia.learningmanagement.service.impl;

import com.xebia.learningmanagement.entity.Category;
import com.xebia.learningmanagement.entity.Courses;
import com.xebia.learningmanagement.entity.Duration;
import com.xebia.learningmanagement.model.*;
import com.xebia.learningmanagement.repository.CategoryRepository;
import com.xebia.learningmanagement.repository.CourseRepository;
//import com.xebia.learningmanagement.repository.UserRepository;
import com.xebia.learningmanagement.repository.DurationRepository;
import com.xebia.learningmanagement.service.CourseService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.regex.Pattern;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    CourseRepository courseRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    DurationRepository durationRepository;

    @Override
    public Set<Courses> getCoursesByKeyword(String keyword) {
        Category category = categoryRepository.findCategoryByName(keyword);
        Set<Courses> coursesList = courseRepository.findByCategory(category);
        List<Courses> allCourses = courseRepository.findAll();
        for (Courses course : allCourses) {
            String name = course.getName();
            if (Pattern.compile(Pattern.quote(keyword), Pattern.CASE_INSENSITIVE).matcher(name).find()) {
                coursesList.add(course);
            }
        }
        return coursesList;
    }

    @Override
    public List<Courses> getAllCourses() {
        List<Courses> allCourses = courseRepository.findAll();
        return allCourses;
    }

}
