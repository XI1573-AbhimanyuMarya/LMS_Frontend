package com.xebia.learningmanagement.enums;

public enum NotificationDescription {
    LP_ASSIGNED("A Learning path has been assigned to you by "), /* A Learning path has been assigned to you by MANAGER NAME  */
    LP_EXPIRED(" has been expired. Please ask to your manager for extension."), /* LEARNING PATH NAME has been deleted by your manager.  */
    LP_EXPIRING_IN_A_WEEK(" Last One week to complete learning path : "), /* LEARNING PATH NAME has been deleted by your manager.  */
    LP_MODIFIED("A Learning path has been modified you can check the details."),
    LP_APPROVAL_REQUIRED(" has asked for your approval on learning path : "),  /*  EMPLOYEE NAME has asked for your approval on learning path  LEARNING PATH NAME   */
    LP_DELETED(" has been deleted by your manager."), /* A LEARNING PATH NAME has been deleted by your manager.  */
    LP_CERTIFICATE_APPROVED(" has been approved by your Manager : "), /* A LEARNING PATH NAME has been approved by your Manager : MANGER NAME  */
    LP_CERTIFICATE_REJECTED(" has been rejected by your Manager : "); /* A LEARNING PATH NAME has been rejected by your Manager : MANGER NAME  */

    private final String description;

    NotificationDescription(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }


}
