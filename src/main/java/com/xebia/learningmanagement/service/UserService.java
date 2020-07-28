package com.xebia.learningmanagement.service;

import com.xebia.learningmanagement.entity.User;
import com.xebia.learningmanagement.model.UserDto;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public interface UserService {

	User createUser(UserDto users);

	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;

	//String loginUser(User user, String userName) throws Exception;
}