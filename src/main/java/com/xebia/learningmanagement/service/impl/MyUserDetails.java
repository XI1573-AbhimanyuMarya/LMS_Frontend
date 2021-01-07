package com.xebia.learningmanagement.service.impl;

import com.xebia.learningmanagement.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
public class MyUserDetails implements UserDetails {

    private final String username;
    private final String password;
    private final boolean active;
    private final List<GrantedAuthority> authorities;

    public MyUserDetails(User user) {
        this.username = user.getUsername();
        this.password = user.getPassword();
        this.active = user.isActive();
        this.authorities = user.getRoles().stream().map(role -> new SimpleGrantedAuthority(role.getRoleName())).collect(Collectors.toList());
        log.info("inside MyUserDetails");
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        log.info("inside granted authorities");
        return authorities;
    }

    @Override
    public String getPassword() {
        log.info("inside getPassword");
        return password;
    }

    @Override
    public String getUsername() {
        log.info("inside getUsername");
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        log.info("inside isAccountNonExpired");
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        log.info("inside isAccountNonLocked");
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        log.info("inside isCredentialsNonExpired");
        return true;
    }

    @Override
    public boolean isEnabled() {
        log.info("inside isEnabled");
        return active;
    }
}