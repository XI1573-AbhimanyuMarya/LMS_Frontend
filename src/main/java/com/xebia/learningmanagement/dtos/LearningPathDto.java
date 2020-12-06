package com.xebia.learningmanagement.dtos;

import lombok.Getter;
import lombok.Setter;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.util.List;

public class LearningPathDto {
    @Valid
    private Path path;

    public Path getPath() {
        return path;
    }

    public void setPath(Path path) {
        this.path = path;
    }

    @Getter
    @Setter
    public class Path {
        @NotBlank
        private String name;
        private Long madeById;
        private List<Long> madeForId;
        @NotEmpty
        private List<Long> coursesId;
        private int duration;

        private String description;
        private Long competencyLevelId;

    }
}