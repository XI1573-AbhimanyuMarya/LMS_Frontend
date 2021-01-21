package com.xebia.learningmanagement.repository;

import com.xebia.learningmanagement.entity.LearningPath;
import com.xebia.learningmanagement.entity.LearningPathEmployees;
import com.xebia.learningmanagement.entity.User;
import com.xebia.learningmanagement.enums.LearningPathApprovalStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface LearningPathEmployeesRepository extends JpaRepository<LearningPathEmployees, Long> {

    List<LearningPathEmployees> findByLearningPathMadeBy(User user);

    List<LearningPathEmployees> findByEmployee(User user);

    List<LearningPathEmployees> findByLearningPathId(Long learningPathId);

    LearningPathEmployees findByLearningPathIdAndEmployeeId(long learningPathId, long employeeId);

    long countByPercentCompletedAndApprovalStatus(int percent, LearningPathApprovalStatus approved);

    long countByApprovalStatusNotAndEndDateAfter(LearningPathApprovalStatus rejected, LocalDate now);

    @Query(nativeQuery = true, value = "SELECT approval_status FROM public.learning_path_employees where learning_path_id= ?1 and employee_id = ?2 ")
    LearningPathApprovalStatus findStatusByLearningPathIdAndEmployeeId(Long learningPathId, Long employeeId);

    long countByEmployee(User user);

    long countByPercentCompletedAndApprovalStatusAndEmployee(int i, LearningPathApprovalStatus approved, User user);

    long countByEndDateBeforeAndEmployee(LocalDate now, User user);

    Long countByLearningPathMadeBy(User user);

    long countByPercentCompletedAndApprovalStatusAndLearningPathMadeBy(int i, LearningPathApprovalStatus approved, User user);

    long countByEndDateBeforeAndLearningPathMadeBy(LocalDate now, User user);

    long countByPercentCompletedNotAndApprovalStatusNotAndLearningPathMadeBy(int i, LearningPathApprovalStatus rejected, User user);

    Long countByLearningPath(LearningPath learningPath);

    long countByPercentCompletedNotAndApprovalStatusNotAndEmployee(int i, LearningPathApprovalStatus approved, User user);

    @Query(value = "select to_char(modification_time,'YYYY-Month') as year_month ,count(id) as total from learning_path_employees where approval_status= ?1 and percent_completed= ?2 group by year_month ", nativeQuery = true)
    List<Object> countByApprovalStatusAndPercentCompletedGroupedByYearMonth(String approved, int percent);


    @Query(value = "select to_char(modification_time,'YYYY-Month') as year_month ,count(id) as total from learning_path_employees where approval_status != ?1 and percent_completed > 0 group by year_month ", nativeQuery = true)
    List<Object> countByApprovalStatusNotApprovedAndPercentCompletedGroupedByYearMonth(String approved);

    @Query(value = "select to_char(modification_time,'YYYY-Month') as year_month ,count(id) as total from learning_path_employees where approval_status = ?1 and ( end_date < now() ) group by year_month ", nativeQuery = true)
    List<Object> countByOverdueAndPercentCompletedGroupedByYearMonth(String ytbd);

    List<LearningPathEmployees> findByEndDateAndApprovalStatus(LocalDate date, LearningPathApprovalStatus ytbd);

    long countByEndDateBeforeAndApprovalStatusIn(LocalDate now, List<LearningPathApprovalStatus> asList);
}
