package com.xebia.learningmanagement.service.impl;

import com.xebia.learningmanagement.dtos.request.CertificateRequest;
import com.xebia.learningmanagement.entity.Certificate;
import com.xebia.learningmanagement.repository.CertificateRepository;
import com.xebia.learningmanagement.service.CertificateService;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.nio.charset.StandardCharsets;
import java.util.*;

@Service
@Transactional
@Slf4j
public class CertificateServiceImpl implements CertificateService {


    private CertificateRepository certificateRepository;

    @Autowired
    public CertificateServiceImpl(CertificateRepository certificateRepository) {
        this.certificateRepository = certificateRepository;
    }


    public List<Certificate> uploadCertificate(CertificateRequest certificateRequest) throws Exception {
        List<Certificate> certificateList = new ArrayList<>();
        try {
            for (MultipartFile request : certificateRequest.getCertificate()) {
                Certificate certificate = Certificate.builder()
                        .employeeId(certificateRequest.getEmployeeId())
                        .courseId(certificateRequest.getCourseId())
                        .learningPathEmployeeId(certificateRequest.getLearningPathEmployeeId())
                        .fileName(request.getOriginalFilename())
                        .certificate(request.getBytes())
                        .build();
                certificateList.add(certificate);
            }
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
        return certificateRepository.saveAll(certificateList);
    }

    public List< String> fetchCertificate(long learningPathEmployeeId, long employeeId) {
        List< String> certificateBag = null;
        List<Certificate> certificates = certificateRepository.findByLearningPathEmployeeIdAndEmployeeId(learningPathEmployeeId, employeeId);
        for (Certificate certificatesObject : certificates) {
            String image = Objects.nonNull(certificatesObject.getCertificate()) ? new String(Base64.encodeBase64(certificatesObject.getCertificate()), StandardCharsets.UTF_8) : "No Certificate Found";
            certificateBag.add(image);
        }
        return certificateBag;
    }


}
