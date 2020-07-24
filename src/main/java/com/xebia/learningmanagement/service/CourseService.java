package com.xebia.learningmanagement.service;

import com.xebia.learningmanagement.model.*;

public interface CourseService {

	Courses createCourse(Courses courses);

	Courses findByCourseName(String name);

	Category createCategory(CategoryDto categoryDto);

	Category findByCategoryId(Long id);

	SubCategory createSubCategory(SubCategory subCategory);

	SubCategory findBySubCategoryId(Long id);

	Category findByCode(String code);
}
