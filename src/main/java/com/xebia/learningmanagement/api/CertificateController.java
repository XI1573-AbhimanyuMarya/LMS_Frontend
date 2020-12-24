package com.xebia.learningmanagement.api;

import com.xebia.learningmanagement.dtos.request.CertificateRequest;
import com.xebia.learningmanagement.dtos.response.CertificateResponse;
import com.xebia.learningmanagement.entity.Certificate;
import com.xebia.learningmanagement.service.CertificateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/certificate")
public class CertificateController {

    private CertificateService certificateServiceImpl;

    @Autowired
    public CertificateController(CertificateService certificateServiceImpl) {
        this.certificateServiceImpl = certificateServiceImpl;
    }

    @PostMapping(value = "/api/v1/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public List<Certificate> uplaodCertificate(@Valid @ModelAttribute CertificateRequest certificateRequest) throws Exception {
        return certificateServiceImpl.uploadCertificate(certificateRequest);
    }

    @GetMapping(value = "/api/v1/get/{learningPathEmployeeId}/{employeeId}")
    public List<CertificateResponse> fetchImage(@PathVariable long learningPathEmployeeId, @PathVariable long employeeId) {
        return certificateServiceImpl.fetchCertificate(learningPathEmployeeId,employeeId);
    }


}
