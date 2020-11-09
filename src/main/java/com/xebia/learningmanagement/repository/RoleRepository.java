package com.xebia.learningmanagement.repository;

import com.xebia.learningmanagement.entity.Role;
import com.xebia.learningmanagement.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

	Role save(Role role);

	Optional<Role> findByRoleName(String roleName);

}

