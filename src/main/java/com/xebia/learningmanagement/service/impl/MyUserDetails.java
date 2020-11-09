package com.xebia.learningmanagement.service.impl;

import com.xebia.learningmanagement.entity.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class MyUserDetails implements UserDetails {

	Logger logger = LoggerFactory.getLogger(MyUserDetails.class);

	private String username;
	private String password;
	private boolean active;
	private List<GrantedAuthority> authorities;

	public MyUserDetails(User user){
		this.username = user.getUsername();
		this.password = user.getPassword();
		this.active = user.isActive();
		this.authorities = user.getRoles().stream().map(role->new SimpleGrantedAuthority(role.getRoleName())).collect(Collectors.toList());

//		this.authorities = Arrays.stream(user.getRoles().split(","))
//				.map(SimpleGrantedAuthority::new)
//				.collect(Collectors.toList());
//		System.out.println(authorities);
		logger.info("inside MyUserDetails");
	}
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		logger.info("inside granted authorities");
		return authorities;
	}

	@Override
	public String getPassword() {
		logger.info("inside getPassword");
		return password;
	}

	@Override
	public String getUsername() {
		logger.info("inside getUsername");
		return username;
	}

	@Override
	public boolean isAccountNonExpired() {
		logger.info("inside isAccountNonExpired");
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		logger.info("inside isAccountNonLocked");
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		logger.info("inside isCredentialsNonExpired");
		return true;
	}

	@Override
	public boolean isEnabled() {
		logger.info("inside isEnabled");
		return active;
	}
}