package com.xebia.learningmanagement.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String fullName;
    private String designation;
    private String empID;
    private String location;
    private String cOEType;
    private String username;
    private String password;
    private boolean active;
    private String roles;
    @JsonIgnore
    @OneToMany(mappedBy = "employee")
    private List<LearningPathEmployees> learningPath;

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public String getRoles() {
        return roles;
    }

    public void setRoles(String roles) {
        this.roles = roles;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public String getEmpID() {
        return empID;
    }

    public void setEmpID(String empID) {
        this.empID = empID;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getcOEType() {
        return cOEType;
    }

    public void setcOEType(String cOEType) {
        this.cOEType = cOEType;
    }

    @JsonIgnore
    public List<LearningPathEmployees> getLearningPath() {
        return learningPath;
    }

    @JsonIgnore
    public void setLearningPathEmployees(List<LearningPathEmployees> learningPath) {
        this.learningPath = learningPath;
    }
}
