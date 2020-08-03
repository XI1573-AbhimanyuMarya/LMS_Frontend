package com.xebia.learningmanagement.model;

import java.util.List;

public class UserResponse {
    private String status;
    private String message;
    private Payload payload;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Payload getPayload() {
        return payload;
    }

    public void setPayload(Payload payload) {
        this.payload = payload;
    }

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
