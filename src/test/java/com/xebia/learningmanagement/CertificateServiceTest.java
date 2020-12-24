package com.xebia.learningmanagement;


import com.xebia.learningmanagement.dtos.request.CertificateRequest;
import com.xebia.learningmanagement.entity.Certificate;
import com.xebia.learningmanagement.repository.CertificateRepository;
import com.xebia.learningmanagement.service.CertificateService;
import com.xebia.learningmanagement.service.impl.CertificateServiceImpl;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.stubbing.Answer;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

@SpringBootTest
public class CertificateServiceTest {

    @Mock
    private CertificateRepository certificateRepository;

    @InjectMocks
    private CertificateServiceImpl certificateServiceImpl;




    @DisplayName("Upload certificate Test")
    @Test
    public void uploadCertificateTest() throws IOException {

        CertificateRequest certificateRequest=Mockito.mock(CertificateRequest.class);

        MultipartFile file=Mockito.mock(MultipartFile.class);

        List<MultipartFile> fileList=new ArrayList<>();
        fileList.add(file);

        Certificate certificate=Mockito.mock(Certificate.class);

        List<Certificate> certificateList = new ArrayList<>();
        certificateList.add(certificate);
        Mockito.when(certificateRequest.getCertificate()).thenReturn(fileList);
         Mockito.when(certificateRepository.saveAll(Mockito.anyList())).thenReturn(certificateList);
        List<Certificate> certList= certificateServiceImpl.uploadCertificate(certificateRequest);
        assertEquals(1,certList.size());


    }

    @Test
    public void fetchCertificateTest()
    {
        Certificate certificate=Mockito.mock(Certificate.class);
        List<Certificate> certificateList=new ArrayList<>();
        certificateList.add(certificate);
       Mockito.when(certificateRepository.findByLearningPathEmployeeIdAndEmployeeId
               (Mockito.anyLong(), Mockito.anyLong())).thenReturn(certificateList);
        List<String> list=certificateServiceImpl.fetchCertificate(1L,2L);

        assertEquals(1,list.size());
    }
}
