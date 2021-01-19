package com.xebia.learningmanagement.service;

import com.xebia.learningmanagement.dtos.NotificationContentDTO;

import java.util.List;

public interface NotificationService {

    List<NotificationContentDTO> getUserNotifications(Long userId, Integer pageNo, Integer pageSize);

    Integer getUnreadNotificationCount(Long userId);

    void markAllAsRead(Long userId);
}
