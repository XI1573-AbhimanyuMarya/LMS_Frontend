package com.xebia.learningmanagement.dtos.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import java.util.List;

@Getter
@Setter
public class AdminDeleteLearningPathDetails {
    @NotEmpty(message = "learningPath Ids cannot be null or Empty")
    private List<Long> learningPathIds;
}
