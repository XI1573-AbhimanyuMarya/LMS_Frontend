package com.xebia.learningmanagement.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.xebia.learningmanagement.entity.LearningPath;
import com.xebia.learningmanagement.entity.User;

@Repository
public interface LearningPathRepository extends JpaRepository<LearningPath, Long> {
	
    List<LearningPath> findByMadeBy(User user);

	List<LearningPath> findByMadeById(Long assigneeId);

}
