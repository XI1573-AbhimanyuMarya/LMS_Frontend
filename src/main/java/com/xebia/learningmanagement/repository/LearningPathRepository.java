package com.xebia.learningmanagement.repository;

import com.xebia.learningmanagement.entity.LearningPath;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LearningPathRepository extends JpaRepository<LearningPath, Long> {
}
