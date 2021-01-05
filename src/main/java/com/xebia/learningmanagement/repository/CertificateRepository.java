package com.xebia.learningmanagement.repository;

import com.xebia.learningmanagement.entity.Certificate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CertificateRepository extends JpaRepository<Certificate, Long> {
    List<Certificate> findByLearningPathEmployeeIdAndEmployeeId(long learningPathId, long employeeId);

    List<Certificate> findByLearningPathEmployeeIdAndEmployeeIdAndCourseId(Long learningPathEmployeesId, Long employeeId, Long singleCourseId);
}
