package com.xebia.learningmanagement.service.impl;

import com.xebia.learningmanagement.entity.User;
import com.xebia.learningmanagement.repository.UserRepository;
import com.xebia.learningmanagement.util.EmailSend;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;
@Service
public class EmailService {
	@Autowired
	private UserRepository userRepository;

	public void sendEmail(String username) {
		Optional<User> user = userRepository.findByUsername(username);
		int otp = getRandomNumberUsingNextInt();
		user.get().setPassword(String.valueOf(otp));
		userRepository.save(user.get());
		System.out.println(otp);
		EmailSend.setEmail(user.get().getUsername(),"LMS portal : OTP","Your OTP for Learning Management is : "+ otp);
	}

	private int getRandomNumberUsingNextInt() {
		Random random = new Random();
		return random.nextInt(999999 - 100000) + 100000;
	}
}
