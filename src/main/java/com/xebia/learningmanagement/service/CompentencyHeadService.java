package com.xebia.learningmanagement.service;

import com.xebia.learningmanagement.model.CompentencyHead;

import java.util.List;

public interface CompentencyHeadService {

	List<CompentencyHead> getCompentencyHead(Long id, String name);

	CompentencyHead createCompentency(CompentencyHead compentencyHead);

}
