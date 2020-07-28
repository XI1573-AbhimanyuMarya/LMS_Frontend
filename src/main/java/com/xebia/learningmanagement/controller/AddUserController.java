package com.xebia.learningmanagement.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.xebia.learningmanagement.model.EmployeeMetaData;
import com.xebia.learningmanagement.entity.User;
import com.xebia.learningmanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

@RestController
public class AddUserController {
    @Autowired
    RestTemplate restTemplate;

    @Autowired
    UserRepository userRepository;

    @PostMapping("/addNewUsers")
    public void addNewUsers() {
        int count = 1;
        for (int j = 0; j < 4; j++) {
            String uri = "https://people.zoho.com/people/api/forms/P_EmployeeView/records?authtoken=f85d7b9916365d6cbd723b2fd8b6ba74&sIndex=" + count;

            List emp = restTemplate.getForObject(uri, List.class);

            ObjectMapper mapper = new ObjectMapper();
            List<EmployeeMetaData> emp2 = mapper.convertValue(emp, new TypeReference<>() {
            });

            for (int i = 0; i < emp2.size(); i++) {
                Optional<User> user2 = userRepository.findByUsername(emp2.get(i).getXebiaEmailID());
                if (user2.isPresent()) {
                    System.out.println(true);
                } else {
                    User user = new User();
                    user.setUsername(emp2.get(i).getXebiaEmailID());
                    user.setFullName(emp2.get(i).getFullName());
                    user.setDesignation(emp2.get(i).getDesignation()); //auth token, builder pattern, forms set in application properties
                    user.setEmpID(emp2.get(i).getEmployeeID());
                    user.setcOEType(emp2.get(i).getCOEType());
                    user.setLocation(emp2.get(i).getBaseLocation());
                    user.setActive(true);

                    String designation = emp2.get(i).getDesignation();
                    if (designation.equals("Consultant") || designation.equals("Trainee") || designation.equals("Junior Consultant") || designation.equals("Senior Consultant"))
                        user.setRoles("ROLE_EMPLOYEE");
                    else
                        user.setRoles("ROLE_MANAGER");
                    userRepository.save(user);
                }
            }
            count = count + 200;
        }
    }
}
