package com.xebia.learningmanagement.repository;

import com.xebia.learningmanagement.entity.LearningPath;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface LearningPathRepository extends JpaRepository<LearningPath, Long> {
    @Modifying
    @Transactional
    @Query(value = "Update public.learning_path SET  is_expired=true WHERE ( now() >= learning_path.end_date )", nativeQuery = true)
    void updateIsExpiredOfLearningPath();

}
