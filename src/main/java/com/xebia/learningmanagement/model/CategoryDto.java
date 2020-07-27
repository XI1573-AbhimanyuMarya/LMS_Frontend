package com.xebia.learningmanagement.model;

import org.springframework.util.LinkedMultiValueMap;

import java.util.List;

public class CategoryDto {
	private Long categoryId;
	private String code;
	private String name;
	private CompentencyHead compentencyHead;

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Long categoryId) {
		this.categoryId = categoryId;
	}

	public CompentencyHead getCompentencyHead() {
		return compentencyHead;
	}

	public void setCompentencyHead(CompentencyHead compentencyHead) {
		this.compentencyHead = compentencyHead;
	}
}
