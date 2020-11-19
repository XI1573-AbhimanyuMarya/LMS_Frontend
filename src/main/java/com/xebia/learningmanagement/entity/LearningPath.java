package com.xebia.learningmanagement.entity;

import freemarker.template.utility.DateUtil;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Entity
@Getter
@Setter
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

    @Column(name = "start_Date")
    private LocalDate startDate;

    @Column(name = "end_Date")
    private LocalDate endDate;

    @Column(name = "isExpired")
    private Boolean isLearningPathExpired = Boolean.FALSE;;

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
