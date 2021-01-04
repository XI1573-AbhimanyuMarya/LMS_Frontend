package com.xebia.learningmanagement.repository;

import com.xebia.learningmanagement.entity.LearningPathEmployees;
import com.xebia.learningmanagement.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface LearningPathEmployeesRepository extends JpaRepository<LearningPathEmployees,Long> {

    List<LearningPathEmployees> findByLearningPathMadeBy(User user);

    List<LearningPathEmployees> findByEmployee(User user);

    long countByPercentCompleted(int percent);

    long countByPercentCompletedNot(int percent);

    List<LearningPathEmployees> findByLearningPathId(Long learningPathId);

    LearningPathEmployees findByLearningPathIdAndEmployeeId(long learningPathId, long employeeId);

    long countByEndDateBefore(LocalDate now);
}
