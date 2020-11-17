package com.xebia.learningmanagement.service;

import com.xebia.learningmanagement.dtos.UserDto;

import java.util.List;

public interface UserService {
    List<UserDto> getAllUsers();

    void addNewUsers();
}
