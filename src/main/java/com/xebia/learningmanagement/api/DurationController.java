package com.xebia.learningmanagement.api;

import com.xebia.learningmanagement.entity.Duration;
import com.xebia.learningmanagement.service.DurationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/duration")
@Slf4j
public class DurationController {
    @Autowired
    private DurationService durationService;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/api/v1/list")
    public List<Duration> getDurations() {
        return durationService.getDurationList();
    }
}
