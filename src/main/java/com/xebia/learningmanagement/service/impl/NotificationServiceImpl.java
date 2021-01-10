package com.xebia.learningmanagement.service.impl;

import com.xebia.learningmanagement.dtos.NotificationContentDTO;
import com.xebia.learningmanagement.entity.Notification;
import com.xebia.learningmanagement.entity.User;
import com.xebia.learningmanagement.exception.UserNotFoundException;
import com.xebia.learningmanagement.repository.NotificationRepository;
import com.xebia.learningmanagement.repository.UserRepository;
import com.xebia.learningmanagement.service.NotificationService;
import com.xebia.learningmanagement.util.MessageBank;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static com.xebia.learningmanagement.enums.NotificationRecipient.EMPLOYEE;
import static com.xebia.learningmanagement.enums.NotificationRecipient.MANAGER;

@Service
@Transactional
public class NotificationServiceImpl implements NotificationService {
    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private UserRepository userRepository;


    @Override
    public List<NotificationContentDTO> getUserNotifications(Long userId, Integer pageNo, Integer pageSize) {
        ModelMapper modelMapper = new ModelMapper();
        Pageable page = PageRequest.of(pageNo, pageSize, Sort.by("createdAt").descending());
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(MessageBank.USERNAME_NOT_FOUND));
        Page<Notification> notifications = notificationRepository.findByNotificationFor(user, page);
        List<Long> readNotificationIds = notifications.stream().map(Notification::getNotificationId).collect(Collectors.toList());
        readNotificationIds.forEach(notification -> notificationRepository.notificationIsReadToTrue(notification));
        return notifications.stream().map(a -> modelMapper.map(a, NotificationContentDTO.class)).collect(Collectors.toList());
    }

    @Override
    public Integer getUnreadNotificationCount(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(MessageBank.USERNAME_NOT_FOUND));
       return notificationRepository.countByNotificationForAndIsRead(user, false);
    }
}
