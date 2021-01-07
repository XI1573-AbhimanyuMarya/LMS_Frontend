package com.xebia.learningmanagement.entity;

import com.xebia.learningmanagement.enums.NotificationRecipient;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long notificationId;
    private LocalDateTime createdAt;
    private boolean isRead;
    private String notificationHeader;
    private String notificationDescription;
    @ManyToOne(cascade = CascadeType.PERSIST)
    private LearningPath learningPath;
    @ManyToOne(cascade = CascadeType.PERSIST)
    private User notificationFor;
    @ManyToOne(cascade = CascadeType.PERSIST)
    private User notificationBy;

}
