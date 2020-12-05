package com.xebia.learningmanagement.api;

import com.xebia.learningmanagement.entity.Duration;
import com.xebia.learningmanagement.service.DurationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@RestController
@Slf4j
public class DurationController {
    @Autowired
    private DurationService durationService;

    @GetMapping("/duration")
    public  List<Duration> getDurations(){
        List<Duration> durations = durationService.getDurationList();
        return durations;
    }



}
