package com.xebia.learningmanagement.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class UserResponse {
    private String status;
    private String message;
    private Payload payload;

    public class Payload {
        private List<?> objectList;

        public List<?> getObjectList() {
            return objectList;
        }

        public void setObjectList(List<?> objectList) {
            this.objectList = objectList;
        }
    }
}
