package com.xebia.learningmanagement.repository;

import com.xebia.learningmanagement.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	User save(User user);

	Optional<User> findByUsername(String username);

}

