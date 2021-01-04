package com.xebia.learningmanagement.exception;

public class ErrorResponse extends Exception{

    private String message;

    public ErrorResponse(String message) {
        super(message);
        this.message=message;
    }


}
