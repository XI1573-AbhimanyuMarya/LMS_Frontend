package com.xebia.learningmanagement.entity;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
public class LearningPath {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String name;
    @ManyToOne
    private User madeBy;
    @OneToMany(mappedBy = "learningPath", orphanRemoval = true)
    private List<LearningPathEmployees> madeFor;
    @ManyToMany
    private List<Courses> courses;
    @ManyToOne
    private Duration duration;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public User getMadeBy() {
        return madeBy;
    }

    public void setMadeBy(User madeBy) {
        this.madeBy = madeBy;
    }

    public List<LearningPathEmployees> getMadeFor() {
        return madeFor;
    }

    public void setMadeFor(List<LearningPathEmployees> madeFor) {
        this.madeFor = madeFor;
    }

    public List<Courses> getCourses() {
        return courses;
    }

    public void setCourses(List<Courses> courses) {
        this.courses = courses;
    }

    public Duration getDuration() {
        return duration;
    }

    public void setDuration(Duration duration) {
        this.duration = duration;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof LearningPath)) return false;
        LearningPath that = (LearningPath) o;
        return Objects.equals(getName(), that.getName()) &&
                getMadeBy().equals(that.getMadeBy()) &&
                Objects.equals(getMadeFor(), that.getMadeFor()) &&
                Objects.equals(getCourses(), that.getCourses()) &&
                Objects.equals(getDuration(), that.getDuration());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getName(), getMadeBy(), getMadeFor(), getCourses(), getDuration());
    }
}
