package com.xebia.learningmanagement.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class LearningPathEmployeesException extends RuntimeException {
    public LearningPathEmployeesException(String message) {
        super(message);
    }
}
