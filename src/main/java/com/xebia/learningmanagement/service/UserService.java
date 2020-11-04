package com.xebia.learningmanagement.service;

import com.xebia.learningmanagement.model.UserDto;

import java.util.List;

public interface UserService {
    List<UserDto> getAllUsers();

    void addNewUsers();
}
