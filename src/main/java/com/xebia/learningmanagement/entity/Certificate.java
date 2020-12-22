package com.xebia.learningmanagement.entity;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Builder
@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Certificate {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private long employeeId;
    private long courseId;
    private long learningPathEmployeeId;
    private byte[] certificate;
    private String fileName;


}
