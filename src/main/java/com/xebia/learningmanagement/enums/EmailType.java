package com.xebia.learningmanagement.enums;

public enum EmailType {

    LEARNING_PATH_ASSIGN("CourseAssignEmail"),
    LOGIN_USING_OTP("LoginUsingOtp"),
    LEARNING_PATH_DISCARD("CourseDiscardEmail");
    private final String value;

    EmailType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

}
