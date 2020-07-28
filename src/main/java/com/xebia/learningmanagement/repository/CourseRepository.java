package com.xebia.learningmanagement.repository;

import com.xebia.learningmanagement.entity.Category;
import com.xebia.learningmanagement.entity.Courses;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface CourseRepository extends JpaRepository<Courses,Long> {

	Courses findCourseByName(String name);

	Set<Courses> findByCategory(Category category);
}
