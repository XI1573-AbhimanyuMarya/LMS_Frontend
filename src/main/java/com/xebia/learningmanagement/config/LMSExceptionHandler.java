package com.xebia.learningmanagement.config;

import com.xebia.learningmanagement.dtos.response.UserResponse;
import com.xebia.learningmanagement.exception.ErrorResponse;
import com.xebia.learningmanagement.exception.LearningPathException;
import com.xebia.learningmanagement.exception.UserNotificationException;
import com.xebia.learningmanagement.util.MessageBank;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;


@RestControllerAdvice
public class LMSExceptionHandler {

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(Exception.class)
    public ErrorResponse exceptionHandler(Exception e) {
        return new ErrorResponse(e.getMessage());
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(ErrorResponse.class)
    public ErrorResponse errorResponseHandler(ErrorResponse e) {
        return new ErrorResponse(e.getMessage());
    }


    @ExceptionHandler({LearningPathException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public UserResponse handleIdNotFoundException(LearningPathException e) {
        return new UserResponse(MessageBank.FAILURE, e.getMessage());
    }

    @ExceptionHandler({UserNotificationException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public UserResponse handleUserNotificationException(UserNotificationException e) {
        return new UserResponse(MessageBank.FAILURE, e.getMessage());
    }


    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    protected UserResponse handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {
        return new UserResponse(MessageBank.FAILURE, ex.getBindingResult().getFieldError().getDefaultMessage());
    }
}
