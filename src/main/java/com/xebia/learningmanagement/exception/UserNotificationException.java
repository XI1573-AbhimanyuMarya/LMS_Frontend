package com.xebia.learningmanagement.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class UserNotificationException extends RuntimeException {

    public UserNotificationException(String message) {
        super(message);
    }
}
