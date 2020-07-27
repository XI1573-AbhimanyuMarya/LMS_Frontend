package com.xebia.learningmanagement.service;

import com.xebia.learningmanagement.model.*;
import com.xebia.learningmanagement.repository.CategoryRepository;
import com.xebia.learningmanagement.repository.CompentencyHeadRepo;
import com.xebia.learningmanagement.repository.CourseRepository;
import com.xebia.learningmanagement.repository.SubCategoryRepository;
//import com.xebia.learningmanagement.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.Date;
import java.util.List;

@Service
public class ServiceImpl implements CourseService {

	@Autowired
	CourseRepository courseRepository;
	@Autowired
	CategoryRepository categoryRepository;
	@Autowired
	SubCategoryRepository subCategoryRepository;
	@Autowired
	CompentencyHeadRepo compentencyHeadRepo;

	/*@Autowired
	UserRepository userRepository;*/


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
		category.setCreatedAt(new Date());
		System.out.println(" competemcy "+category.getCompentencyHead().getName());
		return category;
	}


	public Category findByCategoryId(Long id) {

		return categoryRepository.findCategoryById(id);

	}

	public SubCategory createSubCategory(SubCategory subCategory) {

		subCategory = subCategoryRepository.save(subCategory);
		return subCategory;
	}

	public SubCategory findBySubCategoryId(Long id) {

		return subCategoryRepository.findSubCategoryById(id);

	}

	@Override
	public Category findByCode(String code) {
		return categoryRepository.findCategoryByCode(code);
	}


}
