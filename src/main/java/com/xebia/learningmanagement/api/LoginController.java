package com.xebia.learningmanagement.api;

import com.xebia.learningmanagement.model.Login;
import com.xebia.learningmanagement.dtos.response.LoginResponse;
import com.xebia.learningmanagement.model.*;
import com.xebia.learningmanagement.repository.UserRepository;
import com.xebia.learningmanagement.service.UserService;
import com.xebia.learningmanagement.service.impl.EmailService;
import com.xebia.learningmanagement.service.impl.MyUserDetailsService;
import com.xebia.learningmanagement.util.JwtUtil;
import lombok.extern.slf4j.Slf4j;
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

@CrossOrigin("*")
@Slf4j
@RestController
public class LoginController {

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
    public ResponseEntity<LoginResponse> verifyUsername(@RequestBody Username userEmail) throws Exception {
        LoginResponse loginResponse = new LoginResponse();
        try {
            String username = userEmail.getUsername();
            myUserDetailsService.loadUserByUsername(userEmail.getUsername());
            emailService.sendEmail(userEmail.getUsername());
            UserDetails userDetails = myUserDetailsService.loadUserByUsername(userEmail.getUsername());
            tempUsername.setUsername(userEmail.getUsername());
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
            log.info("Token: "+ jwt);
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

}