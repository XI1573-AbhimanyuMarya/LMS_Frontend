package com.xebia.learningmanagement.repository;

import com.xebia.learningmanagement.entity.Notification;
import com.xebia.learningmanagement.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    @Modifying
    @Transactional
    @Query(value = "UPDATE public.notification SET is_read = true WHERE notification_id = ?1", nativeQuery = true)
    void notificationIsReadToTrue(@Param("notification_id") Long notificationId);

    Page<Notification> findByNotificationFor(User user, Pageable page);

    Integer countByNotificationForAndIsRead(User user, boolean isRead);
}
