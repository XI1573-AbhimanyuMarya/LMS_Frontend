package com.xebia.learningmanagement.exception;

public class ErrorResponse extends Exception{

    public final String message;

    public ErrorResponse(String message) {
        super(message);
        this.message=message;
    }


}
