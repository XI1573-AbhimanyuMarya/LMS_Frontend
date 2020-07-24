package com.xebia.learningmanagement.repository;

import com.xebia.learningmanagement.model.CompentencyHead;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompentencyHeadRepo extends JpaRepository<CompentencyHead, Long> {
}
