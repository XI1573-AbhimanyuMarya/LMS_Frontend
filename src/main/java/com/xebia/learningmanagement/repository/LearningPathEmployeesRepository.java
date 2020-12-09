package com.xebia.learningmanagement.repository;

import com.xebia.learningmanagement.entity.LearningPathEmployees;
import com.xebia.learningmanagement.entity.User;
import com.xebia.learningmanagement.enums.LearningPathApprovalStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface LearningPathEmployeesRepository extends JpaRepository<LearningPathEmployees,Long> {

    List<LearningPathEmployees> findByLearningPathMadeBy(User user);
    List<LearningPathEmployees> findByEmployee(User user);

    @Modifying
    @Transactional
    @Query(value = "Update public.learning_path_employees SET  is_expired=true WHERE ( now() >= learning_path_employees.end_date )", nativeQuery = true)
    void updateIsExpiredOfLearningPath();



    List<LearningPathEmployees> findByIsLearningPathExpiredAndApprovalStatus(boolean b, LearningPathApprovalStatus pending);

    long countByPercentCompleted(int percent);
    long countByPercentCompletedNot(int percent);
    long countByIsLearningPathExpired(boolean b);

    List<LearningPathEmployees> findByLearningPathId(Long learningPathId);
}
