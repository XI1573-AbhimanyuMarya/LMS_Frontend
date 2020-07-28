package com.xebia.learningmanagement.service.impl;

//import com.xebia.learningmanagement.model.GrantedAuthorityImpl;
import com.xebia.learningmanagement.entity.User;
import com.xebia.learningmanagement.model.UserDto;
import com.xebia.learningmanagement.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
		import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class UserServiceImpl implements UserDetailsService {
	private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);


	@Autowired
	UserRepository userRepository;

	/*@Autowired
	PasswordEncoder encoder;

	@Autowired
	Authentication authentication;*/


	public User createUser(UserDto userDto) {
		User user = userRepository.save(transformToModelBeforeSave(userDto));

		return userRepository.save(user);

	}

	User transformToModelBeforeSave(UserDto userDto) {
		User users = new User();
		BeanUtils.copyProperties(userDto, users);
		//users.setCreatedAt(new Date());
		return users;
	}

@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<User> user = userRepository.findByUsername(username);
		return user.map(MyUserDetails::new).get();
	}
/*@Override
public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	com.xebia.learningmanagement.entity.User user = userRepository.findByUserName(username);
	if (user == null) {
		throw new UsernameNotFoundException(username);
	}
	return new UserPrinciple(user);
}*/
}
