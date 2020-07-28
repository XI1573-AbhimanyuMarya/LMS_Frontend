package com.xebia.learningmanagement.controller;

import com.xebia.learningmanagement.entity.User;
import com.xebia.learningmanagement.model.Login;
import com.xebia.learningmanagement.model.UserResponse;
import com.xebia.learningmanagement.model.*;
import com.xebia.learningmanagement.repository.UserRepository;
import com.xebia.learningmanagement.service.impl.EmailService;
import com.xebia.learningmanagement.service.impl.UserServiceImpl;
import com.xebia.learningmanagement.util.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
/*import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;*/
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@RestController
@RequestMapping(name = "/apis")
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    UserServiceImpl userServiceImpl;

    @Autowired
    UserRepository userRepository;

    @Autowired
    EmailService emailService;

    @Autowired
    TempUsername tempUsername;

    @Autowired
    JwtUtil jwtUtil;

    @Autowired
    AuthenticationManager authenticationManager;

    @PostMapping("/createUser")
    public ResponseEntity<?> createUser(@RequestBody UserDto users) {
        User user = userServiceImpl.createUser(users);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasRole('ROLE_SUPERADMIN')")
    @RequestMapping({"/superadmin"})
    public String user() {
        return "SuperAdmin";
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @RequestMapping({"/admin"})
    public String admin() {
        return "Admin";
    }

    @PostMapping("/username")
    public ResponseEntity<UserResponse> verifyUsername(@RequestBody Username username) throws Exception {
        UserResponse userResponse = new UserResponse();
        try {
            userServiceImpl.loadUserByUsername(username.getUsername());
            emailService.sendEmail(username.getUsername());
            UserDetails userDetails = userServiceImpl.loadUserByUsername(username.getUsername());
            tempUsername.setUsername(username.getUsername());
            userResponse.setMessage("user verified and mail send");
            userResponse.setStatus("success");
            return ResponseEntity.status(HttpStatus.OK).body(userResponse);
        } catch (NoSuchElementException e) {
            userResponse.setMessage("invalid user");
            userResponse.setStatus("failure");
//            throw new Exception("Incorrect username",e);
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(userResponse);
        }
    }

    @PostMapping("/password")
    public ResponseEntity<UserResponse> verifyPassword(@RequestBody Password password) throws Exception {
        UserResponse userResponse = new UserResponse();
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            tempUsername.getUsername(), password.getPassword()));
            final UserDetails userDetails = userServiceImpl
                    .loadUserByUsername(tempUsername.getUsername());

            final String jwt = jwtUtil.generateToken(userDetails);
            userResponse.setStatus("success");
            userResponse.setMessage("Otp verified");
            userResponse.setLogin(new Login(jwt));
            return ResponseEntity.status(HttpStatus.OK).body(userResponse);
        } catch (BadCredentialsException e) {
            userResponse.setStatus("failure");
            userResponse.setMessage("Invalid OTP");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(userResponse);
        }
    }


}
