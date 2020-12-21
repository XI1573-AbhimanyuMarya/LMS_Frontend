package com.xebia.learningmanagement.service;

import com.xebia.learningmanagement.dtos.request.CertificateRequest;
import com.xebia.learningmanagement.entity.Certificate;

import java.util.List;
import java.util.Map;

public interface CertificateService {
    public List<Certificate> uploadCertificate(CertificateRequest certificateRequest) throws Exception;
    public List< String> fetchCertificate(long learningPathEmployeeId, long employeeId);

}
