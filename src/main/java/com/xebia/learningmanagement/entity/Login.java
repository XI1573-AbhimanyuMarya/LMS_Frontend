package com.xebia.learningmanagement.entity;

public class Login {
	private String jwt;

	public Login(String jwt) {
		this.jwt = jwt;
	}

	public String getJwt() {
		return jwt;
	}

	public void setJwt(String jwt) {
		this.jwt = jwt;
	}

}
