package com.xebia.learningmanagement.repository;

import com.xebia.learningmanagement.entity.Competency;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompetencyRepository extends JpaRepository<Competency, Long> {


}
