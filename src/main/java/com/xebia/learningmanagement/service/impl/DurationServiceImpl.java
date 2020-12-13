package com.xebia.learningmanagement.service.impl;

import com.xebia.learningmanagement.entity.Duration;
import com.xebia.learningmanagement.repository.DurationRepository;
import com.xebia.learningmanagement.service.DurationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DurationServiceImpl implements DurationService {

    @Autowired
    private DurationRepository durationRepository;

    public List<Duration> getDurationList(){
        return durationRepository.findAll();
    }

}
