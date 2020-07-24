package com.xebia.learningmanagement.repository;

import com.xebia.learningmanagement.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<com.xebia.learningmanagement.model.User, Long> {

	User save(User user);

	//User findByEmail(String email);
	//User findByUserName(String userName);

	//User findByUserName(String userName);

	void deleteByUsername(String username);

	Optional<com.xebia.learningmanagement.model.User> findByUsername(String username);

}

