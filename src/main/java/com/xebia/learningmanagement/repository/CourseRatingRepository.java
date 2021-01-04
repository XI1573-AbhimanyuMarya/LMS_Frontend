package com.xebia.learningmanagement.repository;

import com.xebia.learningmanagement.entity.CourseRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRatingRepository extends JpaRepository<CourseRating, Long> {

    @Query("SELECT u FROM CourseRating u WHERE u.learningPathId = ?1 and u.employeeId = ?2")
    List<CourseRating> getRatingByLearningPathAndEmployeeId(long learningPathId, long employeeId);

    CourseRating findByLearningPathIdAndCourseIdAndEmployeeId(long learningPathId, long courseId, long employeeId);
}