package com.xebia.learningmanagement.api;

import com.xebia.learningmanagement.model.UserDto;
import com.xebia.learningmanagement.repository.UserRepository;
import com.xebia.learningmanagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;


    @GetMapping("/getAllUsers")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> allUsers = userService.getAllUsers();
        return ResponseEntity.ok().body(allUsers);
    }

    @PostMapping("/addNewUsers")
    public void addNewUsers() {
        userService.addNewUsers();
    }
}
