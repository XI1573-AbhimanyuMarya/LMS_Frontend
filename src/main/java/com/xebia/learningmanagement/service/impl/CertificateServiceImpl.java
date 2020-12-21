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
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@Slf4j
public class CertificateServiceImpl implements CertificateService {



    private CertificateRepository certificateRepository;

    @Autowired
    public CertificateServiceImpl(CertificateRepository certificateRepository)
    {
        this.certificateRepository=certificateRepository;
    }



    public List<Certificate> uploadCertificate(CertificateRequest certificateRequest) throws Exception {
        List<Certificate> certificateList = new ArrayList<>();;

        try {

            for (MultipartFile request : certificateRequest.getCertificate()) {
                Certificate certificate = Certificate.builder()
                        .employeeId(certificateRequest.getEmployeeId())
                        .courseId(certificateRequest.getCourseId())
                        .learningPathEmployeeId(certificateRequest.getLearningPathEmployeeId())
                        .certificate(request.getBytes())
                        .build();

                certificateList.add(certificate);
            }
        } catch (Exception e) {
           throw new Exception(e.getMessage());
        }

        return certificateRepository.saveAll(certificateList);



    }

    public List<byte[]> fetchCertificate(long learningPathEmployeeId, long employeeId)
    {
        return certificateRepository
                .getCertificateByLearningPathIdAndEmployeeId(learningPathEmployeeId,employeeId)
                .stream()
                .map(x-> Base64.encodeBase64(x.getCertificate()))
                .collect(Collectors.toList());
    }


}
