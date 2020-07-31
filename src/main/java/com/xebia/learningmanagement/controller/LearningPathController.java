package com.xebia.learningmanagement.controller;

import com.xebia.learningmanagement.entity.LearningPath;
import com.xebia.learningmanagement.model.Path;
import com.xebia.learningmanagement.service.LearningPathService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class LearningPathController {
    @Autowired
    LearningPathService learningPathService;

    @PostMapping("/postPath")
    public ResponseEntity<String> createLearningPath(@RequestBody Path path){

        System.out.println(path);
        System.out.println("courses = "  + path.getCoursesId());
        System.out.println("duration = " + path.getDuration());
        System.out.println("madeBy = " + path.getMadeById());
        System.out.println("name = " + path.getName());
        System.out.println("madeFor = "+ path.getMadeForId());
        learningPathService.createLearningPath(path);

        return ResponseEntity.ok("learning path created");
    }

    @GetMapping("/getPath")
    public ResponseEntity<Path> showPath(){
        List<Long> madefor= Arrays.asList(101l,102l,103l);
        List<Long> courses= Arrays.asList(201l,203l,204l,205l);
        Path path = new Path("nameL1",103l,madefor,courses,3);
        return ResponseEntity.ok(path);
    }
}
