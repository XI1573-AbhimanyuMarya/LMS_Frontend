package com.xebia.learningmanagement.service.impl;

import com.xebia.learningmanagement.entity.User;
import com.xebia.learningmanagement.model.UserDto;
import com.xebia.learningmanagement.repository.UserRepository;
import com.xebia.learningmanagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepository userRepository;

    @Override
    public List<UserDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        List<UserDto> userDtos = new ArrayList<>();
        for (int i = 0; i <users.size() ; i++) {
            UserDto userDto = new UserDto();

            userDto.setcOEType(users.get(i).getcOEType());
            userDto.setDesignation(users.get(i).getDesignation());
            userDto.setEmpID(users.get(i).getEmpID());
            userDto.setLocation(users.get(i).getLocation());
            userDto.setFullName(users.get(i).getFullName());
            userDto.setRoles(users.get(i).getRoles());
            userDto.setId(users.get(i).getId());
            userDto.setUsername(users.get(i).getUsername());

            userDtos.add(userDto);
        }

        return userDtos;
    }
}
