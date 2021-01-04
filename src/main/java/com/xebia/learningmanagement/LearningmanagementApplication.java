package com.xebia.learningmanagement;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.client.RestTemplate;

@EnableScheduling
@SpringBootApplication
public class LearningmanagementApplication {

	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}

	@Bean
	public ObjectMapper getObjectMapper()
	{
		return new ObjectMapper();
	}

	public static void main(String[] args) {
		SpringApplication.run(LearningmanagementApplication.class, args);
	}

}
