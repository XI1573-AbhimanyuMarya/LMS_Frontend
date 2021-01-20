package com.xebia.learningmanagement.util;

import com.xebia.learningmanagement.entity.LearningPath;
import com.xebia.learningmanagement.entity.LearningPathEmployees;
import com.xebia.learningmanagement.entity.Notification;
import com.xebia.learningmanagement.entity.User;
import com.xebia.learningmanagement.enums.EmailType;
import com.xebia.learningmanagement.exception.UserNotificationException;
import com.xebia.learningmanagement.repository.LearningPathEmployeesRepository;
import com.xebia.learningmanagement.repository.NotificationRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.xebia.learningmanagement.enums.LearningPathApprovalStatus.YTBD;
import static com.xebia.learningmanagement.enums.NotificationDescription.*;
import static com.xebia.learningmanagement.enums.NotificationHeader.*;
import static com.xebia.learningmanagement.util.MessageBank.ERROR_UPDATING_NOTIFICATION;
import static com.xebia.learningmanagement.util.MessageBank.EXECEPTION_OCCURED;

@Service
@Transactional
@Slf4j
public class UpdateUserNotification {

    @Autowired
    private NotificationRepository notificationRepository;
    @Autowired
    private LearningPathEmployeesRepository employeesRepository;
    @Autowired
    private EmailSend emailSend;


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
            log.info("Review Notification updated Successfully");

        } catch (UserNotificationException e) {
            log.error(EXECEPTION_OCCURED + e);
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
            log.error(EXECEPTION_OCCURED + e);
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
                    .notificationDescription("Learning Path : " + learningpathemployees.getLearningPath().getName() + " ," + LP_DELETED.getDescription())
                    .notificationBy(learningpathemployees.getLearningPath().getMadeBy())
                    .build();
            notificationRepository.saveAndFlush(notification);
            log.info("Notifications for Deleted Learning Path for an Employee updated Successfully");


        } catch (UserNotificationException e) {
            log.error(EXECEPTION_OCCURED + e);
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
            log.error(EXECEPTION_OCCURED + e);
            throw new UserNotificationException(ERROR_UPDATING_NOTIFICATION);
        }


    }

    public void learningPathModifiedNotifications(LearningPath learningPath, User employee) {
        try {
            Notification notification = Notification.builder().createdAt(LocalDateTime.now())
                    .isRead(false)
                    .notificationFor(employee)
                    .notificationBy(learningPath.getMadeBy())
                    .learningPath(learningPath)
                    .notificationHeader(Learning_Path_Modified.getValue())
                    .notificationDescription(learningPath.getName() + " : " + LP_MODIFIED.getDescription())
                    .build();
            notificationRepository.saveAndFlush(notification);
            log.info("Notifications for Modified Learning Path updated Successfully");
        } catch (Exception e) {
            log.error(EXECEPTION_OCCURED + e);
            throw new UserNotificationException(ERROR_UPDATING_NOTIFICATION);
        }
    }

    @Scheduled(cron = "0 1 10 * * ?")
    public void learningPathWeeklyExpirationReminder() {
        LocalDate weekBefore = LocalDate.now().plusDays(7);
        List<LearningPathEmployees> learningPathsExpiringInAWeek = employeesRepository.findByEndDateAndApprovalStatus(weekBefore, YTBD);
        try {

            for (LearningPathEmployees pathEmployees : learningPathsExpiringInAWeek) {
                Notification notification = Notification.builder().createdAt(LocalDateTime.now())
                        .isRead(false)
                        .notificationFor(pathEmployees.getEmployee())
                        .notificationBy(pathEmployees.getLearningPath().getMadeBy())
                        .learningPath(pathEmployees.getLearningPath())
                        .notificationHeader(Learning_Path_Expiring_In_A_Week.getValue())
                        .notificationDescription(LP_EXPIRING_IN_A_WEEK.getDescription() + pathEmployees.getLearningPath().getName())
                        .build();

                notificationRepository.saveAndFlush(notification);
                log.info("Notifications for weekly Reminder for Learning Path updated Successfully");
            }


        } catch (Exception e) {
            log.error(EXECEPTION_OCCURED + e);
            throw new UserNotificationException(ERROR_UPDATING_NOTIFICATION);
        }


    }


    @Scheduled(cron = "0 1 20 * * ?")
//    @Scheduled(fixedDelay = 10000)
    public void learningPathExpiredNotification() {
        LocalDate weekBefore = LocalDate.now().minusDays(1);
        List<LearningPathEmployees> learningPathsExpired = employeesRepository.findByEndDateAndApprovalStatus(weekBefore, YTBD);
        try {

            for (LearningPathEmployees pathEmployees : learningPathsExpired) {
                Notification notification = Notification.builder().createdAt(LocalDateTime.now())
                        .isRead(false)
                        .notificationFor(pathEmployees.getEmployee())
                        .notificationBy(pathEmployees.getLearningPath().getMadeBy())
                        .learningPath(pathEmployees.getLearningPath())
                        .notificationHeader(Learning_Path_Expired.getValue())
                        .notificationDescription(pathEmployees.getLearningPath().getName() + LP_EXPIRED.getDescription())
                        .build();

                notificationRepository.saveAndFlush(notification);
                setExpirationMailPropertiesAndSendEmail(pathEmployees);
                log.info("Notifications for Expired Learning Path updated Successfully & sent email");
            }


        } catch (Exception e) {
            log.error(EXECEPTION_OCCURED + e);
            throw new UserNotificationException(ERROR_UPDATING_NOTIFICATION);
        }


    }


    private void setExpirationMailPropertiesAndSendEmail(LearningPathEmployees learningPathEmployees) throws Exception {

        Map<String, String> model = new HashMap<>();

        model.put("learningPathName", learningPathEmployees.getLearningPath().getName());
        model.put("Email", learningPathEmployees.getEmployee().getUsername());
        model.put("employeeName", learningPathEmployees.getEmployee().getFullName());
        model.put("emailByForCC", learningPathEmployees.getLearningPath().getMadeBy().getUsername());
        emailSend.sendEmailMethodUsingTemplate(EmailType.LEARNING_PATH_EXPIRED.getValue(), model);
    }
}
