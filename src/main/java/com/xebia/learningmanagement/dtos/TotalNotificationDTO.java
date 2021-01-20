package com.xebia.learningmanagement.dtos;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class TotalNotificationDTO {
    private long totalCount;
    private List<NotificationContentDTO> notifications;
}
