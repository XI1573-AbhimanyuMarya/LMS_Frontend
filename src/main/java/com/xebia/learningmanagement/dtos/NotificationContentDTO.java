package com.xebia.learningmanagement.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class NotificationContentDTO {
    private String notificationHeader;
    private String notificationDescription;
    @JsonFormat(pattern = "dd/MM/yyyy'T'hh:mm:ss")
    private LocalDateTime createdAt;

}
