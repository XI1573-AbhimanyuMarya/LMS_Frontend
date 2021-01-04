package com.xebia.learningmanagement.service.impl;

import com.xebia.learningmanagement.entity.Competency;
import com.xebia.learningmanagement.repository.CompetencyRepository;
import com.xebia.learningmanagement.service.CompetencyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompetencyServiceImpl implements CompetencyService {

    private CompetencyRepository competencyRepository;

    @Autowired
    public CompetencyServiceImpl(CompetencyRepository competencyRepository)
    {
        this.competencyRepository=competencyRepository;
    }

    @Override
    public List<Competency> getCompetencyLevels() {
        return competencyRepository.findAll();
    }
}
