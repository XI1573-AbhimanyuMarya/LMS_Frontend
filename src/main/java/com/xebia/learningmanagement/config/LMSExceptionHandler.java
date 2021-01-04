package com.xebia.learningmanagement.config;

import com.xebia.learningmanagement.dtos.response.UserResponse;
import com.xebia.learningmanagement.exception.ErrorResponse;
import com.xebia.learningmanagement.exception.LearningPathException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;


@RestControllerAdvice
public class LMSExceptionHandler extends ResponseEntityExceptionHandler {

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(Exception.class)
    public ErrorResponse exceptionHandler(Exception e)
    {
        return new ErrorResponse(e.getMessage());
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(ErrorResponse.class)
    public ErrorResponse errorResponseHandler(ErrorResponse e)
    {
        return new ErrorResponse(e.getMessage());
    }


    @ExceptionHandler({LearningPathException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public UserResponse handleIdNotFoundException(LearningPathException e) {
        UserResponse userResponse = new UserResponse();
        userResponse.setStatus("failure");
        userResponse.setMessage(e.getMessage());
        return userResponse;
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
                                                                  HttpHeaders headers, HttpStatus status, WebRequest request) {
        UserResponse userResponse = new UserResponse();
        userResponse.setStatus("failure");
        userResponse.setMessage("validation failed");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(userResponse);
    }
}
