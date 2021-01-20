package com.xebia.learningmanagement.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
public class LearningPath {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String name;
    @ManyToOne
    private User madeBy;

    @ManyToMany(fetch = FetchType.EAGER)
    private List<Courses> courses;
    private String description;
    @ManyToOne
    private Competency competency;
}
