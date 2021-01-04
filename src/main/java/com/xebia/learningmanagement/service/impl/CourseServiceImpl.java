package com.xebia.learningmanagement.service.impl;

import com.xebia.learningmanagement.entity.Category;
import com.xebia.learningmanagement.entity.Courses;
import com.xebia.learningmanagement.repository.CategoryRepository;
import com.xebia.learningmanagement.repository.CourseRepository;
import com.xebia.learningmanagement.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.regex.Pattern;

@Service
public class CourseServiceImpl implements CourseService {


    private CourseRepository courseRepository;


    private CategoryRepository categoryRepository;

    @Autowired
    public CourseServiceImpl(CourseRepository courseRepository,CategoryRepository categoryRepository)
    {
        this.categoryRepository=categoryRepository;
        this.courseRepository=courseRepository;
    }

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
        return courseRepository.findAll();
    }

}
