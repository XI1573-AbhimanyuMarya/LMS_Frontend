package com.xebia.learningmanagement.service;

import com.xebia.learningmanagement.model.CompentencyHead;
import com.xebia.learningmanagement.repository.CompentencyHeadRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompentencyHeadImpl implements CompentencyHeadService{

	@Autowired
	CompentencyHeadRepo compentencyHeadRepo;

	public List<CompentencyHead> getCompentencyHead(Long id, String name){

		return compentencyHeadRepo.findAll();
	}

	@Override
	public CompentencyHead createCompentency(CompentencyHead compentencyHead) {

		compentencyHead=compentencyHeadRepo.save(compentencyHead);
		return compentencyHead;

	}


}
