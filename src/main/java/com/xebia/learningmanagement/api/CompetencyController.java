package com.xebia.learningmanagement.api;

import com.xebia.learningmanagement.entity.Competency;
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
@RequestMapping("/competency")
@Slf4j
public class CompetencyController {
    @Autowired
    private CompetencyService competencyService;

    @GetMapping("/api/v1/levels")
    public List<Competency> getDurations() {
        return competencyService.getCompetencyLevels();
    }
}
