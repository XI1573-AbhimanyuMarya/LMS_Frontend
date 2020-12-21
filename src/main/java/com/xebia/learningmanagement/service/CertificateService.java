package com.xebia.learningmanagement.service;

import com.xebia.learningmanagement.dtos.request.CertificateRequest;
import com.xebia.learningmanagement.entity.Certificate;

import java.util.List;

public interface CertificateService {
    public List<Certificate> uploadCertificate(CertificateRequest certificateRequest) throws Exception;

}
