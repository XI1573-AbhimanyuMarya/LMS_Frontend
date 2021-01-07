package com.xebia.learningmanagement.api;

import com.xebia.learningmanagement.dtos.NotificationContentDTO;
import com.xebia.learningmanagement.service.NotificationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/notification")
@Slf4j
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping("/api/v1/employee")
    public List<NotificationContentDTO> getUserNotifications(@RequestParam @NotBlank(message = "User ID can not be Blank") Long userId,
                                                             @RequestParam(defaultValue = "0") Integer pageNo,
                                                             @RequestParam(defaultValue = "6") Integer pageSize) {
        return notificationService.getUserNotifications(userId, pageNo, pageSize);

    }

    @GetMapping("/api/v1/unread/count")
    public Integer getUnreadNotificationCount(@RequestParam @NotBlank(message = "User ID can not be Blank") Long userId) {
        return notificationService.getUnreadNotificationCount(userId);
    }


}
