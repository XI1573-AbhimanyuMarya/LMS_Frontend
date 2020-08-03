package com.xebia.learningmanagement.model;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
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

    public class Path{
        @NotBlank
        private String name;
        private Long madeById;
        @NotEmpty
        private List<Long> madeForId;
        @NotEmpty
        private List<Long> coursesId;
        private int duration;

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
}
