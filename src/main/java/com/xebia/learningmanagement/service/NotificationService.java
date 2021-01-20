package com.xebia.learningmanagement.service;

import com.xebia.learningmanagement.dtos.NotificationContentDTO;
import com.xebia.learningmanagement.dtos.TotalNotificationDTO;

import java.util.List;

public interface NotificationService {

    TotalNotificationDTO getUserNotifications(Long userId, Integer pageNo, Integer pageSize);

    Integer getUnreadNotificationCount(Long userId);

    void markAllAsRead(Long userId);
}
