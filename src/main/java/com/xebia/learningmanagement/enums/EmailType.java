package com.xebia.learningmanagement.enums;

public enum EmailType {

    LEARNING_PATH_ASSIGN("CourseAssignEmail"),
    LOGIN_USING_OTP("LoginUsingOtp"),
    LEARNING_PATH_DISCARD("CourseDiscardEmail"),
    LEARNING_PATH_APPROVAL_REJECTION("ApprovalRejectionEmail"),
    LEARNING_PATH_EXPIRED("ExpirationEmail"),
    REVIEW_LEARNING_PATH_APPROVAL_REJECTION_MANAGER("ReviewApprovalRejectionManagerEmail");
    private final String value;

    EmailType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

}
