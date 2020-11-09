package com.xebia.learningmanagement.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
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
    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
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
}
