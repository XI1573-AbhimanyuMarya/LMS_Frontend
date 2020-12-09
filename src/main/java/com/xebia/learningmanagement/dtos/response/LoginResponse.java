package com.xebia.learningmanagement.dtos.response;

import com.xebia.learningmanagement.entity.Role;
import com.xebia.learningmanagement.entity.User;
import com.xebia.learningmanagement.model.Login;

import java.util.Set;

public class LoginResponse {
	private String status;
	private String message;
	private Login login;
	private User user;
	private Set<Role> roles ;

	public Login getLogin() {
		return login;
	}

	public void setLogin(Login login) {
		this.login = login;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}
}