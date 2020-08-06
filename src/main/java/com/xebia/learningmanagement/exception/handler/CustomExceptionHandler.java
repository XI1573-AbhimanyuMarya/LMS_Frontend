package com.xebia.learningmanagement.exception.handler;

import com.xebia.learningmanagement.exception.LearningPathException;
import com.xebia.learningmanagement.model.UserResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler({LearningPathException.class})
    public ResponseEntity<UserResponse> handleIdNotFoundException(LearningPathException e) {
        UserResponse userResponse = new UserResponse();
        userResponse.setStatus("failure");
        userResponse.setMessage(e.getMessage());
        return ResponseEntity.badRequest().body(userResponse);
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
