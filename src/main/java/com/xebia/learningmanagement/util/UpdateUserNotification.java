package com.xebia.learningmanagement.util;

import com.xebia.learningmanagement.entity.LearningPath;
import com.xebia.learningmanagement.entity.LearningPathEmployees;
import com.xebia.learningmanagement.entity.Notification;
import com.xebia.learningmanagement.entity.User;
import com.xebia.learningmanagement.exception.UserNotificationException;
import com.xebia.learningmanagement.repository.NotificationRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

import static com.xebia.learningmanagement.enums.NotificationDescription.*;
import static com.xebia.learningmanagement.enums.NotificationHeader.*;
import static com.xebia.learningmanagement.util.MessageBank.ERROR_UPDATING_NOTIFICATION;

@Component
@Transactional
@Slf4j
public class UpdateUserNotification {

    @Autowired
    private NotificationRepository notificationRepository;


    public void learningPathReviewNotifications(LearningPathEmployees learningPathEmployees, String description, String header) {

        try {
            Notification notification = Notification.builder().createdAt(LocalDateTime.now())
                    .isRead(false)
                    .learningPath(learningPathEmployees.getLearningPath())
                    .notificationHeader(header)
                    .notificationDescription(description)
                    .notificationFor(learningPathEmployees.getEmployee())
                    .notificationBy(learningPathEmployees.getLearningPath().getMadeBy())
                    .build();
            notificationRepository.saveAndFlush(notification);
            log.info("Updated Notification Successfully");

        } catch (UserNotificationException e) {
            log.error("Exception :- ", e);
            throw new UserNotificationException(ERROR_UPDATING_NOTIFICATION);
        }


    }

    public void learningPathAssignedNotifications(LearningPath learningPath, User employee) {

        try {
            Notification notification = Notification.builder().createdAt(LocalDateTime.now())
                    .isRead(false)
                    .notificationFor(employee)
                    .notificationBy(learningPath.getMadeBy())
                    .learningPath(learningPath)
                    .notificationHeader(Learning_Path_Assigned.getValue())
                    .notificationDescription(LP_ASSIGNED.getDescription() + learningPath.getMadeBy().getFullName())
                    .build();
            notificationRepository.saveAndFlush(notification);
            log.info("Notifications for Assigned Learning Path updated Successfully");
        } catch (Exception e) {
            log.error("Exception :- ", e);
            throw new UserNotificationException(ERROR_UPDATING_NOTIFICATION);
        }
    }

    public void learningPathDeletedNotifications(LearningPathEmployees learningpathemployees) {

        try {
            Notification notification = Notification.builder().createdAt(LocalDateTime.now())
                    .notificationFor(learningpathemployees.getEmployee())
                    .isRead(false)
                    .learningPath(learningpathemployees.getLearningPath())
                    .notificationHeader(Learning_Path_Deleted.getValue())
                    .notificationDescription("Learning Path : " + learningpathemployees.getLearningPath().getName() + LP_DELETED.getDescription())
                    .notificationBy(learningpathemployees.getLearningPath().getMadeBy())
                    .build();
            notificationRepository.saveAndFlush(notification);
            log.info("Notifications for Deleted Learning Path for an Employee updated Successfully");


        } catch (UserNotificationException e) {
            throw new UserNotificationException(ERROR_UPDATING_NOTIFICATION);
        }

    }

    public void managerApprovalRequiredNotifications(LearningPathEmployees learningPathEmployees) {

        try {

            Notification notification = Notification.builder().createdAt(LocalDateTime.now())
                    .notificationFor(learningPathEmployees.getEmployee())
                    .notificationBy(learningPathEmployees.getLearningPath().getMadeBy())
                    .isRead(false)
                    .learningPath(learningPathEmployees.getLearningPath())
                    .notificationHeader(Learning_Path_Approval_Required.getValue())
                    .notificationDescription(learningPathEmployees.getEmployee().getFullName() + LP_APPROVAL_REQUIRED.getDescription() + learningPathEmployees.getLearningPath().getName())
                    .build();
            notificationRepository.saveAndFlush(notification);
            log.info("Notifications for required Approval of Learning Path by Manager updated Successfully");

        } catch (UserNotificationException e) {
            throw new UserNotificationException(ERROR_UPDATING_NOTIFICATION);
        }


    }
}
