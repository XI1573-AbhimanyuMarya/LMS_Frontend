package com.xebia.learningmanagement.model;

public class Login {
	private String jwt;
	private boolean islogin;

	public Login(String jwt, boolean islogin) {
		this.jwt = jwt;
		this.islogin = islogin;
	}

	public String getJwt() {
		return jwt;
	}

	public void setJwt(String jwt) {
		this.jwt = jwt;
	}

	public boolean isIslogin() {
		return islogin;
	}

	public void setIslogin(boolean islogin) {
		this.islogin = islogin;
	}
}
