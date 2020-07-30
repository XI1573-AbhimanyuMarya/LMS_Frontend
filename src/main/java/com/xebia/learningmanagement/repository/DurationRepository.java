package com.xebia.learningmanagement.repository;

import com.xebia.learningmanagement.entity.Duration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DurationRepository extends JpaRepository<Duration,Long> {
}
