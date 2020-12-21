package com.xebia.learningmanagement.dtos.request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
public class CertificateRequest {

    private long employeeId;
    private long courseId;
    private long learningPathEmployeeId;
    private List<MultipartFile> certificate;
}
