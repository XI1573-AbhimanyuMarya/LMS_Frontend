package com.xebia.learningmanagement.service.impl;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.xebia.learningmanagement.dtos.UserDto;
import com.xebia.learningmanagement.entity.Role;
import com.xebia.learningmanagement.entity.User;
import com.xebia.learningmanagement.model.EmployeeMetaData;
import com.xebia.learningmanagement.repository.RoleRepository;
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
    RoleRepository roleRepository;

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
            userDto.setcOEType(users.get(i).getCOEType());
            userDto.setDesignation(users.get(i).getDesignation());
            userDto.setEmpID(users.get(i).getEmpID());
            userDto.setLocation(users.get(i).getLocation());
            userDto.setFullName(users.get(i).getFullName());
            userDto.setRoles(users.get(i).getRoles().stream().findFirst().get().getRoleName());
            userDto.setId(users.get(i).getId());
            userDto.setUsername(users.get(i).getUsername());
            userDtos.add(userDto);
        }

        return userDtos;
    }

    //    @Scheduled(fixedDelay = 5000)
    @Scheduled(cron = "0 1 1 * * ?")
    public void addNewUsers() {
        if (!roleRepository.findByRoleName("ROLE_ADMIN").isPresent())
            roleRepository.save(new Role("ROLE_ADMIN"));
        if (!roleRepository.findByRoleName("ROLE_MANAGER").isPresent())
            roleRepository.save(new Role("ROLE_MANAGER"));
        if (!roleRepository.findByRoleName("ROLE_EMPLOYEE").isPresent())
            roleRepository.save(new Role("ROLE_EMPLOYEE"));

        final Role roleManager = roleRepository.findByRoleName("ROLE_MANAGER").get();
        final Role roleEmployee = roleRepository.findByRoleName("ROLE_EMPLOYEE").get();
        int sIndex = 0;
        boolean isMoreData = true;
        while (isMoreData) {

            String uri = "https://people.zoho.com/people/api/forms/P_EmployeeView/records?authtoken=3ab0a1722b48eb4d9db8c69649e73fec&sIndex=" + sIndex;

            List emp = restTemplate.getForObject(uri, List.class);

            ObjectMapper mapper = new ObjectMapper();
            List<EmployeeMetaData> emp2 = mapper.convertValue(emp, new TypeReference<List<EmployeeMetaData>>() {
            });


            isMoreData = emp2.size() >= 200;

            for (int i = 0; i < emp2.size(); i++) {
                EmployeeMetaData employeeMetaData = emp2.get(i);
                Optional<User> user2 = userRepository.findByUsername(employeeMetaData.getXebiaEmailID());
                if (!user2.isPresent()) {
                    User user = new User();
                    user.setUsername(employeeMetaData.getXebiaEmailID());
                    user.setFullName(employeeMetaData.getFullName());
                    user.setDesignation(employeeMetaData.getDesignation()); //auth token, builder pattern, forms set in application properties
                    user.setEmpID(employeeMetaData.getEmployeeID());
                    user.setCOEType(employeeMetaData.getCOEType());
                    user.setLocation(employeeMetaData.getBaseLocation());
                    user.setActive(true);
                    user.setPassword("lkjbswecbng@#(*^hf%CFGJ");
                    user.getRoles().add(getRole(roleManager, roleEmployee, employeeMetaData));
                    userRepository.save(user);
                }
            }
            sIndex = sIndex + emp2.size();
        }
    }

    private Role getRole(Role managerRole, Role employeeRole, EmployeeMetaData employeeMetaData) {
        return employeeMetaData.getDesignation().toLowerCase().contains("manager") ? managerRole : employeeRole;
    }


}
