package com.xebia.learningmanagement.api;

import com.xebia.learningmanagement.entity.Competency;
import com.xebia.learningmanagement.entity.Duration;
import com.xebia.learningmanagement.service.CompetencyService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
@Slf4j
public class CompetencyController {
    @Autowired
    private CompetencyService competencyService;
    @GetMapping("/competency/levels")
    public List<Competency> getDurations(){
        List<Competency> competencyLevels = competencyService.getCompetencyLevels();
        return competencyLevels;
    }
}
