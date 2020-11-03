package com.xebia.learningmanagement.service.impl;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.xebia.learningmanagement.entity.User;
import com.xebia.learningmanagement.model.EmployeeMetaData;
import com.xebia.learningmanagement.model.UserDto;
import com.xebia.learningmanagement.repository.UserRepository;
import com.xebia.learningmanagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    RestTemplate restTemplate;

    @Autowired
    UserService userService;

    @Override
    public List<UserDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        List<UserDto> userDtos = new ArrayList<>();
        for (int i = 0; i < users.size(); i++) {
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
//    @Scheduled(fixedDelay = 5000)
    public void addNewUsers() {
        int count = 1;
        for (int j = 0; j < 4; j++) {
            String uri = "https://people.zoho.com/people/api/forms/P_EmployeeView/records?authtoken=f85d7b9916365d6cbd723b2fd8b6ba74&sIndex=" + count;

            List emp = restTemplate.getForObject(uri, List.class);

            ObjectMapper mapper = new ObjectMapper();
            List<EmployeeMetaData> emp2 = mapper.convertValue(emp, new TypeReference<List<EmployeeMetaData>>() {
            });

            for (int i = 0; i < emp2.size(); i++) {
                Optional<User> user2 = userRepository.findByUsername(emp2.get(i).getXebiaEmailID());
                if (user2.isPresent()) {
                } else {
                    User user = new User();
                    user.setUsername(emp2.get(i).getXebiaEmailID());
                    user.setFullName(emp2.get(i).getFullName());
                    user.setDesignation(emp2.get(i).getDesignation()); //auth token, builder pattern, forms set in application properties
                    user.setEmpID(emp2.get(i).getEmployeeID());
                    user.setcOEType(emp2.get(i).getCOEType());
                    user.setLocation(emp2.get(i).getBaseLocation());
                    user.setActive(true);
                    user.setPassword("lkjbswecbng@#(*^hf%CFGJ");
                    user.setRoles("ROLE_EMPLOYEE");

                    userRepository.save(user);
                }
            }
            count = count + 200;
        }
    }


}
