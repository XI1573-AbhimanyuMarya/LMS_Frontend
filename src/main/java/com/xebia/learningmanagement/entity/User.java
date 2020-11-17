package com.xebia.learningmanagement.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
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

    @JsonIgnore
    @ManyToMany(cascade = {CascadeType.REFRESH, CascadeType.DETACH, CascadeType.MERGE, CascadeType.REMOVE}, fetch = FetchType.EAGER)
    @JoinTable(
            name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "employee")
    private List<LearningPathEmployees> learningPath;

    @JsonIgnore
    public List<LearningPathEmployees> getLearningPath() {
        return learningPath;
    }

    @JsonIgnore
    public void setLearningPathEmployees(List<LearningPathEmployees> learningPath) {
        this.learningPath = learningPath;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User)) return false;
        User user = (User) o;
        return isActive() == user.isActive() &&
                Objects.equals(getId(), user.getId()) &&
                getFullName().equals(user.getFullName()) &&
                Objects.equals(getDesignation(), user.getDesignation()) &&
                Objects.equals(getEmpID(), user.getEmpID()) &&
                Objects.equals(getLocation(), user.getLocation()) &&
                Objects.equals(cOEType, user.cOEType) &&
                getUsername().equals(user.getUsername()) &&
                Objects.equals(getPassword(), user.getPassword()) &&
                Objects.equals(getRoles(), user.getRoles()) &&
                Objects.equals(getLearningPath(), user.getLearningPath());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getFullName(), getDesignation(), getEmpID(), getLocation(), cOEType, getUsername(), getPassword(), isActive(), getRoles(), getLearningPath());
    }
}
