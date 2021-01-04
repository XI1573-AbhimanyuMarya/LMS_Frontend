package com.xebia.learningmanagement.api;

import com.xebia.learningmanagement.dtos.UserDto;
import com.xebia.learningmanagement.repository.UserRepository;
import com.xebia.learningmanagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;

    @GetMapping("/api/v1/get/all/employees")
    public List<UserDto> getAllUsers() {
       return userService.getAllUsers();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/api/v1/addNewUsers")
    public void addNewUsers() {
        userService.addNewUsers();
    }
}
