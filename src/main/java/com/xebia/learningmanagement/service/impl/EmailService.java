package com.xebia.learningmanagement.service.impl;

import com.xebia.learningmanagement.entity.User;
import com.xebia.learningmanagement.enums.EmailType;
import com.xebia.learningmanagement.repository.UserRepository;
import com.xebia.learningmanagement.util.EmailSend;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

import static org.springframework.data.crossstore.ChangeSetPersister.*;

@Service
public class EmailService {
	@Autowired
	private UserRepository userRepository;
	@Autowired
	EmailSend emailSend;

	public void sendEmail(String username) throws Exception {
		User user = userRepository.findByUsername(username).orElseThrow(NotFoundException::new);
		int otp = getRandomNumberUsingNextInt();
		user.setPassword(String.valueOf(otp));
		userRepository.save(user);
		System.out.println(otp);
		setOtpMailPropertiesAndSendEmail(user,otp);
	}

	private void setOtpMailPropertiesAndSendEmail(User user, int otp) throws Exception {

		Map<String, String> model = new HashMap<>();
		model.put("OTP", String.valueOf(otp));
		model.put("Email", user.getUsername());
		emailSend.sendEmailMethodUsingTemplate(EmailType.LOGIN_USING_OTP.getValue(), model);
	}


	private int getRandomNumberUsingNextInt() {
		Random random = new Random();
		return random.nextInt(999999 - 100000) + 100000;
	}
}
