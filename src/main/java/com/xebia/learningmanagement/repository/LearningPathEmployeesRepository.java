package com.xebia.learningmanagement.repository;

import com.xebia.learningmanagement.entity.LearningPath;
import com.xebia.learningmanagement.entity.LearningPathEmployees;
import com.xebia.learningmanagement.entity.User;
import com.xebia.learningmanagement.enums.LearningPathApprovalStatus;
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

    long countByPercentCompletedAndApprovalStatus(int percent, LearningPathApprovalStatus approved);

    long countByPercentCompletedNotOrApprovalStatus(int percent, LearningPathApprovalStatus rejected);

    long countByEmployee(User user);

    long countByPercentCompletedAndApprovalStatusAndEmployee(int i, LearningPathApprovalStatus approved, User user);

    long countByPercentCompletedNotOrApprovalStatusAndEmployee(int i, LearningPathApprovalStatus rejected, User user);

    long countByEndDateBeforeAndEmployee(LocalDate now, User user);

    Long countByLearningPathMadeBy(User user);

    long countByPercentCompletedAndApprovalStatusAndLearningPathMadeBy(int i, LearningPathApprovalStatus approved, User user);

    long countByPercentCompletedNotOrApprovalStatusAndLearningPathMadeBy(int i, LearningPathApprovalStatus rejected, User user);

    long countByEndDateBeforeAndLearningPathMadeBy(LocalDate now, User user);

    long countByPercentCompletedNotOrApprovalStatusNotAndEmployee(int i, LearningPathApprovalStatus rejected, User user);

    long countByPercentCompletedNotOrApprovalStatusNotAndLearningPathMadeBy(int i, LearningPathApprovalStatus rejected, User user);

    Long countByLearningPath(LearningPath learningPath);
}
