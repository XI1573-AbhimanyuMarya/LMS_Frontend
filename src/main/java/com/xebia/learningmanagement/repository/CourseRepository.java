package com.xebia.learningmanagement.repository;

import com.xebia.learningmanagement.model.Courses;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends JpaRepository<Courses,Long> {

	Courses findCourseByName(String name);
}
