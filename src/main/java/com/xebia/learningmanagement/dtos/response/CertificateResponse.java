package com.xebia.learningmanagement.dtos.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CertificateResponse {

    public CertificateResponse(){}
    public CertificateResponse(String src){
        this.src=src;
    }
    private String src;


}
