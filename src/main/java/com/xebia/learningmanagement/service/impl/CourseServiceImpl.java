package com.xebia.learningmanagement.service.impl;

import com.xebia.learningmanagement.entity.Category;
import com.xebia.learningmanagement.entity.Courses;
import com.xebia.learningmanagement.model.*;
import com.xebia.learningmanagement.repository.CategoryRepository;
import com.xebia.learningmanagement.repository.CourseRepository;
//import com.xebia.learningmanagement.repository.UserRepository;
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


    public Courses createCourse(Courses courses) {
        courses = courseRepository.save(courses);

        return courses;
    }

    public Courses findByCourseName(String name) {

        return courseRepository.findCourseByName(name);
    }

    public Category createCategory(CategoryDto categoryDto) {
        Category category = categoryRepository.save(transformToModelBeforeSave(categoryDto));
		/*List<CompentencyHead> compentencyHeads = compentencyHeadRepo.findAll();
		for (CompentencyHead comp : compentencyHeads) {
			comp.getId();
			comp.getName();
			comp = compentencyHeadRepo.save(comp);
			category.setCompentencyHead(comp);

		}*/

        return category;
    }

    @Transactional
    Category transformToModelBeforeSave(CategoryDto categoryDto) {
        Category category = new Category();
        BeanUtils.copyProperties(categoryDto, category);
//		category.setCreatedAt(new Date());
//		System.out.println(" competemcy "+category.getCompentencyHead().getName());
        return category;
    }


    public Category findByCategoryId(Long id) {

        return categoryRepository.findCategoryById(id);

    }

//	@Override
//	public Category findByCode(String code) {
//		return categoryRepository.findCategoryByCode(code);
//	}

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

}
