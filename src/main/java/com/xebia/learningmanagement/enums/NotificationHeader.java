package com.xebia.learningmanagement.enums;

public enum NotificationHeader {
    Learning_Path_Assigned("Learning Path Assigned"),
    Learning_Path_Expired("Learning Path Expired"),
    Learning_Path_Modified("Learning Path Modified"),
    Learning_Path_Approval_Required("Learning Path Approval Required"),
    Learning_Path_Deleted("Learning Path Deleted"),
    Certificate_Approved("Certificate Approved"),
    Certificate_Rejected("Certificate Rejected");

    private final String value;

    NotificationHeader(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
