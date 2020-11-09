package com.xebia.learningmanagement.util;

import freemarker.template.Configuration;
import freemarker.template.Template;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import javax.annotation.PostConstruct;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import java.util.Date;
import java.util.Map;
import java.util.Properties;

@Slf4j
@Service
public class EmailSend {
    private Session session;
    @Autowired
    private Configuration freemarkerConfig;
    @Value("${email.mailPassword}")
    private String mailPassword;
    @Value("${email.mailHost}")
    private String mailHost;
    @Value("${email.mailSmtpAuth}")
    private String mailSmtpAuth;
    @Value("${email.mailSmtpStartTlsEnable}")
    private String mailSmtpStartTlsEnable;
    @Value("${email.emailFrom}")
    private String emailFrom;
    @Value("${email.mailPort}")
    private String mailPort;

    public static void setEmail(String recipient, String subject, String text) {
        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(recipient);
        email.setSubject(subject);
        email.setText(text);
        sendMailUsingTLS(email);
    }

    public static void sendMailUsingTLS(SimpleMailMessage email) {
//        String host = "outlook.office365.com";
        String host = "smtp.gmail.com";
        String username = "xebiaassessmenttool@gmail.com";
        String password = "Xebia@123";
        Properties properties = new Properties();
        properties.put("mail.smtp.host", host);
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.smtp.port", "587");
        sendMail(properties, username, password, email);
    }

    public static void sendMail(Properties properties, String username, String password, SimpleMailMessage email) {
        Session session = Session.getInstance(properties, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
        });
        try {
            Message msg = new MimeMessage(session);
            msg.setFrom(new InternetAddress(username));
            msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(email.getTo()[0]));
            msg.setSubject(email.getSubject());
            msg.setText(email.getText());
            Transport.send(msg);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    @PostConstruct
    public void init() {
        Properties props = new Properties();
        props.put("mail.smtp.auth", mailSmtpAuth);
        props.put("mail.smtp.starttls.enable", mailSmtpStartTlsEnable);
        props.put("mail.smtp.host", mailHost);
        props.put("mail.smtp.port", mailPort);
        this.session = Session.getInstance(props, new javax.mail.Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(emailFrom, mailPassword);
            }
        });
    }

    public void sendEmailMethodUsingTemplate(String value, Map<String, String> modelContent) throws Exception {
        log.info("In user creation sendMailUsingMime method..");

        try {
            Message message = new MimeMessage(this.session);
            message.setFrom(new InternetAddress(emailFrom));
            message.setRecipients(Message.RecipientType.TO,
                    InternetAddress.parse(modelContent.get("Email")));
            message.setSubject(getTemplateValue(value + "-subject.ftl", modelContent));
            message.setSentDate(new Date());
            MimeMultipart multipart = new MimeMultipart("related");
            BodyPart messageBodyPart = new MimeBodyPart();
            messageBodyPart.setContent(getTemplateValue(value + "-body.ftl", modelContent),
                    "text/html");
            multipart.addBodyPart(messageBodyPart);
            message.setContent(multipart);
            Transport transport = session.getTransport("smtp");
            transport.connect();
            transport.sendMessage(message, message.getAllRecipients());
            log.info("Sent Mail Successfully");
        } catch (Exception e) {
            log.error("Excepton ", e);
            throw new Exception("Email server issue");
        }
    }

    private String getTemplateValue(String template, Map<String, String> properties) throws Exception {
        log.info("Getting template: " + template);
//        freemarkerConfig.setDirectoryForTemplateLoading(new File("C:/Java Projects/Learning Management System/Learning/src/main/resources/templates"));
//        freemarkerConfig.setClassForTemplateLoading(this.getClass(), "templates/");
        Template template1 = freemarkerConfig.getTemplate(template);
        return FreeMarkerTemplateUtils.processTemplateIntoString(template1, properties);
    }
}