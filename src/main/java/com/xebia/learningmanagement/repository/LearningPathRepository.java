package com.xebia.learningmanagement.repository;

import com.xebia.learningmanagement.entity.Category;
import com.xebia.learningmanagement.entity.LearningPath;
import com.xebia.learningmanagement.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface LearningPathRepository extends JpaRepository<LearningPath,Long> {
}
