package com.xebia.learningmanagement.controller;

import com.xebia.learningmanagement.model.Login;
import com.xebia.learningmanagement.model.LoginResponse;
import com.xebia.learningmanagement.model.*;
import com.xebia.learningmanagement.repository.UserRepository;
import com.xebia.learningmanagement.service.UserService;
import com.xebia.learningmanagement.service.impl.EmailService;
import com.xebia.learningmanagement.service.impl.MyUserDetailsService;
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

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@CrossOrigin("*")
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(MyUserDetailsService.class);

    @Autowired
    MyUserDetailsService myUserDetailsService;

    @Autowired
    UserService userService;

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
    public ResponseEntity<LoginResponse> verifyUsername(@RequestBody Username username) throws Exception {
        LoginResponse loginResponse = new LoginResponse();
        try {
            myUserDetailsService.loadUserByUsername(username.getUsername());
            emailService.sendEmail(username.getUsername());
            UserDetails userDetails = myUserDetailsService.loadUserByUsername(username.getUsername());
            tempUsername.setUsername(username.getUsername());
            loginResponse.setMessage("user verified and mail send");
            loginResponse.setStatus("success");
            return ResponseEntity.status(HttpStatus.OK).body(loginResponse);
        } catch (NoSuchElementException e) {
            loginResponse.setMessage("invalid user");
            loginResponse.setStatus("failure");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(loginResponse);
        }
    }

    @PostMapping("/password")
    public ResponseEntity<LoginResponse> verifyPassword(@RequestBody Password password) throws Exception {
        LoginResponse loginResponse = new LoginResponse();
        Login login = new Login();

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            tempUsername.getUsername(), password.getPassword()));
            final UserDetails userDetails = myUserDetailsService
                    .loadUserByUsername(tempUsername.getUsername());

            final String jwt = jwtUtil.generateToken(userDetails);
            loginResponse.setStatus("success");
            loginResponse.setMessage("Otp verified");
            login.setJwt(jwt);
            login.setIslogin(true);
            loginResponse.setLogin(login);
            loginResponse.setUser(userRepository.findByUsername(tempUsername.getUsername()).get());
            return ResponseEntity.status(HttpStatus.OK).body(loginResponse);
        } catch (BadCredentialsException e) {
            loginResponse.setStatus("failure");
            loginResponse.setMessage("Invalid OTP");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(loginResponse);
        }
    }

    @GetMapping("/getAllUsers")
    public ResponseEntity<List<UserDto>> getAllUsers(){
        List<UserDto> allUsers = userService.getAllUsers();
        return ResponseEntity.ok().body(allUsers);
    }

}
