package com.xebia.learningmanagement.repository;

import com.xebia.learningmanagement.entity.Certificate;
import com.xebia.learningmanagement.entity.CourseRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CertificateRepository extends JpaRepository<Certificate,Long> {
    @Query("SELECT u FROM Certificate u WHERE u.learningPathEmployeeId = ?1 and u.employeeId = ?2")
    public List<Certificate> getCertificateByLearningPathIdAndEmployeeId(long learningPathId, long employeeId);

}
