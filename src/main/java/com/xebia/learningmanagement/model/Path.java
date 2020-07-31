package com.xebia.learningmanagement.model;


import javax.validation.constraints.NotEmpty;
import java.util.List;

public class Path {

    @NotEmpty
    private String name;
    private Long madeById;
    private List<Long> madeForId;
    private List<Long> coursesId;
    private int duration;

    public Path(String name, Long madeById, List<Long> madeForId, List<Long> coursesId, int duration) {
        this.name = name;
        this.madeById = madeById;
        this.madeForId = madeForId;
        this.coursesId = coursesId;
        this.duration = duration;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getMadeById() {
        return madeById;
    }

    public void setMadeById(Long madeById) {
        this.madeById = madeById;
    }

    public List<Long> getMadeForId() {
        return madeForId;
    }

    public void setMadeForId(List<Long> madeForId) {
        this.madeForId = madeForId;
    }

    public List<Long> getCoursesId() {
        return coursesId;
    }

    public void setCoursesId(List<Long> coursesId) {
        this.coursesId = coursesId;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }
}
