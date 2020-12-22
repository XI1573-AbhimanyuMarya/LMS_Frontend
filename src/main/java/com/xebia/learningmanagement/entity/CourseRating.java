package com.xebia.learningmanagement.entity;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Getter;
import lombok.Builder;
import org.hibernate.validator.constraints.Range;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Max;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class CourseRating {
    @Id
    @GeneratedValue(strategy = GenerationType. AUTO)
    private long id;
    private long employeeId;
    private long learningPathId;
    private long courseId;
    @Range(min = 0, max = 100)
    private int percentCompleted;
}
