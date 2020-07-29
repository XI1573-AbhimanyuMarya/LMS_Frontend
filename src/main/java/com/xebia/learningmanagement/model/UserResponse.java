package com.xebia.learningmanagement.model;

import com.xebia.learningmanagement.entity.User;
import com.xebia.learningmanagement.model.Login;

public class UserResponse {
	private String status;
	private String message;
	private Login login;
	private User user;

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
}